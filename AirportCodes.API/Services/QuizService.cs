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

	public async Task<LearningQuestionDto> GetLearningQuestionAsync()
	{
		// Get total airport count
		var totalCount = await _context.Airports.CountAsync();
		if (totalCount < 4)
		{
			throw new InvalidOperationException("Not enough airports in database to generate a question (minimum 4 required)");
		}

		// Get a random airport as the correct answer
		var random = new Random();
		var skipCount = random.Next(0, totalCount);
		var correctAirport = await _context.Airports
			.Skip(skipCount)
			.Take(1)
			.FirstOrDefaultAsync();

		if (correctAirport == null)
		{
			throw new InvalidOperationException("Failed to retrieve airport for question");
		}

		// Get 3 random distractor airports (excluding the correct one)
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

		// Generate question ID and store correct answer in cache (5 minute expiration)
		var questionId = Guid.NewGuid();
		_cache.Set($"quiz:question:{questionId}", correctAirport.IataCode, TimeSpan.FromMinutes(5));

		return new LearningQuestionDto
		{
			QuestionId = questionId,
			AirportName = correctAirport.AirportName,
			City = correctAirport.City,
			Country = correctAirport.Country,
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
}
