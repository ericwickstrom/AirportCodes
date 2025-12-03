using AirportCodes.API.DTOs;
using AirportCodes.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AirportCodes.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
	private readonly IQuizService _quizService;
	private readonly ILogger<QuizController> _logger;

	public QuizController(IQuizService quizService, ILogger<QuizController> logger)
	{
		_quizService = quizService;
		_logger = logger;
	}

	/// <summary>
	/// Get a new learning mode question with multiple choice options
	/// </summary>
	/// <param name="customTestId">Optional custom test ID to generate questions from</param>
	/// <returns>A question with 4 IATA code options (1 correct + 3 distractors)</returns>
	[HttpGet("learning")]
	public async Task<ActionResult<LearningQuestionDto>> GetLearningQuestion([FromQuery] Guid? customTestId = null)
	{
		try
		{
			// Get userId from JWT claims if user is authenticated
			Guid? userId = null;
			var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
				?? User.FindFirst("sub")
				?? User.FindFirst("userId");
			if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var parsedUserId))
			{
				userId = parsedUserId;
			}

			var question = await _quizService.GetLearningQuestionAsync(customTestId, userId);
			return Ok(question);
		}
		catch (UnauthorizedAccessException ex)
		{
			_logger.LogWarning(ex, "Unauthorized access to custom test {CustomTestId}", customTestId);
			return Forbid();
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogError(ex, "Failed to generate learning question for custom test {CustomTestId}", customTestId);
			return BadRequest(new { message = ex.Message });
		}
	}

	/// <summary>
	/// Submit an answer for a learning mode question
	/// </summary>
	/// <param name="request">The question ID and selected answer</param>
	/// <returns>Feedback indicating if the answer was correct</returns>
	[HttpPost("learning/answer")]
	public async Task<ActionResult<LearningAnswerResponse>> SubmitLearningAnswer([FromBody] LearningAnswerRequest request)
	{
		try
		{
			var response = await _quizService.ValidateLearningAnswerAsync(request);
			return Ok(response);
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogError(ex, "Failed to validate learning answer for question {QuestionId}", request.QuestionId);
			return BadRequest(new { message = ex.Message });
		}
	}

	/// <summary>
	/// Start a new test session
	/// </summary>
	/// <param name="totalQuestions">Number of questions for the test</param>
	/// <param name="customTestId">Optional custom test ID to generate questions from</param>
	/// <returns>Test session information</returns>
	[HttpPost("test/start")]
	public async Task<ActionResult<TestSessionDto>> StartTest([FromQuery] int totalQuestions = 10, [FromQuery] Guid? customTestId = null)
	{
		try
		{
			if (totalQuestions < 1)
			{
				return BadRequest(new { message = "Total questions must be at least 1" });
			}

			// Get userId from JWT claims if user is authenticated
			Guid? userId = null;
			var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
				?? User.FindFirst("sub")
				?? User.FindFirst("userId");
			if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var parsedUserId))
			{
				userId = parsedUserId;
			}

			var session = await _quizService.StartTestAsync(totalQuestions, customTestId, userId);
			return Ok(session);
		}
		catch (UnauthorizedAccessException ex)
		{
			_logger.LogWarning(ex, "Unauthorized access to custom test {CustomTestId}", customTestId);
			return Forbid();
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogError(ex, "Failed to start test with {TotalQuestions} questions for custom test {CustomTestId}", totalQuestions, customTestId);
			return BadRequest(new { message = ex.Message });
		}
	}

	/// <summary>
	/// Get the next question for a test session
	/// </summary>
	/// <param name="sessionId">The test session ID</param>
	/// <returns>A question with 4 IATA code options</returns>
	[HttpGet("test/{sessionId}/question")]
	public async Task<ActionResult<TestQuestionDto>> GetTestQuestion(Guid sessionId)
	{
		try
		{
			var question = await _quizService.GetTestQuestionAsync(sessionId);
			return Ok(question);
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogError(ex, "Failed to get test question for session {SessionId}", sessionId);
			return BadRequest(new { message = ex.Message });
		}
	}

	/// <summary>
	/// Submit an answer for a test question
	/// </summary>
	/// <param name="request">The session ID, question ID, and selected answer</param>
	/// <returns>Immediate feedback indicating if the answer was correct</returns>
	[HttpPost("test/answer")]
	public async Task<ActionResult<TestAnswerResponse>> SubmitTestAnswer([FromBody] TestAnswerRequest request)
	{
		try
		{
			var response = await _quizService.SubmitTestAnswerAsync(request);
			return Ok(response);
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogError(ex, "Failed to submit test answer for session {SessionId}, question {QuestionId}",
				request.SessionId, request.QuestionId);
			return BadRequest(new { message = ex.Message });
		}
	}

	/// <summary>
	/// Get the final results for a completed test
	/// </summary>
	/// <param name="sessionId">The test session ID</param>
	/// <returns>Test results including score percentage</returns>
	[HttpGet("test/{sessionId}/results")]
	public async Task<ActionResult<TestResultDto>> GetTestResults(Guid sessionId)
	{
		try
		{
			var results = await _quizService.GetTestResultsAsync(sessionId);
			return Ok(results);
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogError(ex, "Failed to get test results for session {SessionId}", sessionId);
			return BadRequest(new { message = ex.Message });
		}
	}
}
