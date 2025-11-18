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
	/// <returns>A question with 4 IATA code options (1 correct + 3 distractors)</returns>
	[HttpGet("learning")]
	public async Task<ActionResult<LearningQuestionDto>> GetLearningQuestion()
	{
		try
		{
			var question = await _quizService.GetLearningQuestionAsync();
			return Ok(question);
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogError(ex, "Failed to generate learning question");
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
}
