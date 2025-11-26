using AirportCodes.API.DTOs;

namespace AirportCodes.API.Services;

public interface IQuizService
{
	Task<LearningQuestionDto> GetLearningQuestionAsync(Guid? customTestId = null, Guid? userId = null);
	Task<LearningAnswerResponse> ValidateLearningAnswerAsync(LearningAnswerRequest request);

	Task<TestSessionDto> StartTestAsync(int totalQuestions);
	Task<TestQuestionDto> GetTestQuestionAsync(Guid sessionId);
	Task<TestAnswerResponse> SubmitTestAnswerAsync(TestAnswerRequest request);
	Task<TestResultDto> GetTestResultsAsync(Guid sessionId);
}
