using AirportCodes.API.Data;
using AirportCodes.API.DTOs;
using AirportCodes.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace AirportCodes.API.Services;

public class QuizService : IQuizService
{
	private readonly AirportCodesDbContext _context;
	private readonly IMemoryCache _cache;

	public QuizService(AirportCodesDbContext context, IMemoryCache cache)
	{
		_context = context;
		_cache = cache;
	}

	public async Task<LearningQuestionDto> GetLearningQuestionAsync(Guid? customTestId = null, Guid? userId = null)
	{
		IQueryable<Airport> airportQuery;

		// If customTestId is provided, query from custom test's airports
		if (customTestId.HasValue)
		{
			// Validate custom test exists and is not deleted
			var customTest = await _context.CustomTests
				.Include(ct => ct.CustomTestAirports)
				.FirstOrDefaultAsync(ct => ct.Id == customTestId.Value && !ct.IsDeleted);

			if (customTest == null)
			{
				throw new InvalidOperationException("Custom test not found");
			}

			// Check authorization: test must be public OR user must be the creator
			if (!customTest.IsPublic && (!userId.HasValue || customTest.CreatedByUserId != userId.Value))
			{
				throw new UnauthorizedAccessException("You do not have access to this custom test");
			}

			// Get airport IDs from the custom test
			var airportIds = customTest.CustomTestAirports.Select(cta => cta.AirportId).ToList();

			if (airportIds.Count < 4)
			{
				throw new InvalidOperationException("Custom test must have at least 4 airports to generate multiple choice questions");
			}

			// Query only the airports in this custom test
			airportQuery = _context.Airports
				.Where(a => airportIds.Contains(a.Id));
		}
		else
		{
			// Use all airports (standard learning mode)
			airportQuery = _context.Airports;
		}

		// Get total airport count from the selected query
		var totalCount = await airportQuery.CountAsync();
		if (totalCount < 4)
		{
			throw new InvalidOperationException("Not enough airports to generate a question (minimum 4 required)");
		}

		// Get a random airport as the correct answer
		var random = new Random();
		var skipCount = random.Next(0, totalCount);
		var correctAirport = await airportQuery
			.Include(a => a.City)
				.ThenInclude(c => c.Country)
			.Skip(skipCount)
			.Take(1)
			.FirstOrDefaultAsync();

		if (correctAirport == null)
		{
			throw new InvalidOperationException("Failed to retrieve airport for question");
		}

		// Get 3 random distractor airports (excluding the correct one) from same query
		var distractors = await airportQuery
			.Where(a => a.Id != correctAirport.Id)
			.OrderBy(a => Guid.NewGuid())
			.Take(3)
			.Select(a => a.IataCode)
			.ToListAsync();

		if (distractors.Count < 3)
		{
			throw new InvalidOperationException("Not enough airports to generate distractors");
		}

		// Combine correct answer with distractors and shuffle
		var options = new List<string> { correctAirport.IataCode };
		options.AddRange(distractors);
		options = options.OrderBy(x => random.Next()).ToList();

		// Generate question ID and store correct answer in cache (5 minute expiration)
		var questionId = Guid.NewGuid();
		_cache.Set($"quiz:question:{questionId}", correctAirport.IataCode, TimeSpan.FromMinutes(5));

		return new LearningQuestionDto
		{
			QuestionId = questionId,
			AirportName = correctAirport.AirportName,
			City = correctAirport.City.Name,
			Country = correctAirport.City.Country.Name,
			Options = options
		};
	}

	public async Task<LearningAnswerResponse> ValidateLearningAnswerAsync(LearningAnswerRequest request)
	{
		// Check if question exists in cache
		if (!_cache.TryGetValue($"quiz:question:{request.QuestionId}", out string? correctAnswer) || correctAnswer == null)
		{
			throw new InvalidOperationException("Question not found or has expired");
		}

		// Validate the answer (case-insensitive comparison)
		var isCorrect = string.Equals(request.SelectedAnswer, correctAnswer, StringComparison.OrdinalIgnoreCase);

		// Get airport details for explanation
		var airport = await _context.Airports
			.FirstOrDefaultAsync(a => a.IataCode == correctAnswer);

		var explanation = isCorrect
			? $"Correct! {correctAnswer} is the IATA code for {airport?.AirportName}."
			: $"Incorrect. The correct answer is {correctAnswer} for {airport?.AirportName}.";

		// Remove the question from cache after answering
		_cache.Remove($"quiz:question:{request.QuestionId}");

		return new LearningAnswerResponse
		{
			IsCorrect = isCorrect,
			CorrectAnswer = correctAnswer,
			Explanation = explanation
		};
	}

	public async Task<TestSessionDto> StartTestAsync(int totalQuestions)
	{
		// Validate that we have enough airports for the test
		var totalAirports = await _context.Airports.CountAsync();
		if (totalAirports < totalQuestions)
		{
			throw new InvalidOperationException($"Not enough airports in database. Requested {totalQuestions} questions but only {totalAirports} airports available.");
		}

		if (totalAirports < 4)
		{
			throw new InvalidOperationException("Not enough airports in database to generate questions (minimum 4 required)");
		}

		// Create new test session
		var session = new TestSession
		{
			SessionId = Guid.NewGuid(),
			TotalQuestions = totalQuestions,
			QuestionsAnswered = 0,
			CorrectAnswers = 0,
			UsedAirportIds = new HashSet<Guid>(),
			CreatedAt = DateTime.UtcNow
		};

		// Store session in cache with 30-minute expiration
		_cache.Set($"quiz:test:session:{session.SessionId}", session, TimeSpan.FromMinutes(30));

		return new TestSessionDto
		{
			SessionId = session.SessionId,
			TotalQuestions = totalQuestions
		};
	}

	public async Task<TestQuestionDto> GetTestQuestionAsync(Guid sessionId)
	{
		// Retrieve session from cache
		if (!_cache.TryGetValue($"quiz:test:session:{sessionId}", out TestSession? session) || session == null)
		{
			throw new InvalidOperationException("Test session not found or has expired");
		}

		// Check if test is complete
		if (session.QuestionsAnswered >= session.TotalQuestions)
		{
			throw new InvalidOperationException("Test is already complete");
		}

		// Get a random airport that hasn't been used yet
		var random = new Random();
		Airport? correctAirport = null;
		var maxAttempts = 100; // Prevent infinite loop
		var attempts = 0;

		while (correctAirport == null && attempts < maxAttempts)
		{
			var totalCount = await _context.Airports.CountAsync();
			var skipCount = random.Next(0, totalCount);
			var candidate = await _context.Airports
				.Include(a => a.City)
					.ThenInclude(c => c.Country)
				.Skip(skipCount)
				.Take(1)
				.FirstOrDefaultAsync();

			if (candidate != null && !session.UsedAirportIds.Contains(candidate.Id))
			{
				correctAirport = candidate;
			}
			attempts++;
		}

		if (correctAirport == null)
		{
			throw new InvalidOperationException("Failed to find an unused airport for the question");
		}

		// Get 3 random distractor airports (excluding the correct one and already used ones)
		var distractors = await _context.Airports
			.Where(a => a.Id != correctAirport.Id)
			.OrderBy(a => Guid.NewGuid())
			.Take(3)
			.Select(a => a.IataCode)
			.ToListAsync();

		if (distractors.Count < 3)
		{
			throw new InvalidOperationException("Not enough airports to generate distractors");
		}

		// Combine correct answer with distractors and shuffle
		var options = new List<string> { correctAirport.IataCode };
		options.AddRange(distractors);
		options = options.OrderBy(x => random.Next()).ToList();

		// Generate question ID and store correct answer in cache (30 minute expiration to match session)
		var questionId = Guid.NewGuid();
		_cache.Set($"quiz:test:question:{questionId}", correctAirport.IataCode, TimeSpan.FromMinutes(30));

		return new TestQuestionDto
		{
			QuestionId = questionId,
			AirportName = correctAirport.AirportName,
			City = correctAirport.City.Name,
			Country = correctAirport.City.Country.Name,
			Options = options,
			QuestionNumber = session.QuestionsAnswered + 1,
			TotalQuestions = session.TotalQuestions
		};
	}

	public async Task<TestAnswerResponse> SubmitTestAnswerAsync(TestAnswerRequest request)
	{
		// Retrieve session from cache
		if (!_cache.TryGetValue($"quiz:test:session:{request.SessionId}", out TestSession? session) || session == null)
		{
			throw new InvalidOperationException("Test session not found or has expired");
		}

		// Check if question exists in cache
		if (!_cache.TryGetValue($"quiz:test:question:{request.QuestionId}", out string? correctAnswer) || correctAnswer == null)
		{
			throw new InvalidOperationException("Question not found or has expired");
		}

		// Validate the answer (case-insensitive comparison)
		var isCorrect = string.Equals(request.SelectedAnswer, correctAnswer, StringComparison.OrdinalIgnoreCase);

		// Get the airport to track it as used
		var airport = await _context.Airports
			.FirstOrDefaultAsync(a => a.IataCode == correctAnswer);

		if (airport != null)
		{
			session.UsedAirportIds.Add(airport.Id);
		}

		// Update session stats
		session.QuestionsAnswered++;
		if (isCorrect)
		{
			session.CorrectAnswers++;
		}

		// Update session in cache
		_cache.Set($"quiz:test:session:{request.SessionId}", session, TimeSpan.FromMinutes(30));

		// Remove the question from cache after answering
		_cache.Remove($"quiz:test:question:{request.QuestionId}");

		return new TestAnswerResponse
		{
			IsCorrect = isCorrect,
			CorrectAnswer = correctAnswer
		};
	}

	public Task<TestResultDto> GetTestResultsAsync(Guid sessionId)
	{
		// Retrieve session from cache
		if (!_cache.TryGetValue($"quiz:test:session:{sessionId}", out TestSession? session) || session == null)
		{
			throw new InvalidOperationException("Test session not found or has expired");
		}

		// Calculate results
		var incorrectAnswers = session.QuestionsAnswered - session.CorrectAnswers;
		var scorePercentage = session.QuestionsAnswered > 0
			? Math.Round((double)session.CorrectAnswers / session.QuestionsAnswered * 100, 2)
			: 0;

		// Clear session from cache
		_cache.Remove($"quiz:test:session:{sessionId}");

		return Task.FromResult(new TestResultDto
		{
			TotalQuestions = session.QuestionsAnswered,
			CorrectAnswers = session.CorrectAnswers,
			IncorrectAnswers = incorrectAnswers,
			ScorePercentage = scorePercentage
		});
	}
}
