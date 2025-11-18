using AirportCodes.API.DTOs;

namespace AirportCodes.API.Services;

public interface IQuizService
{
	Task<LearningQuestionDto> GetLearningQuestionAsync();
	Task<LearningAnswerResponse> ValidateLearningAnswerAsync(LearningAnswerRequest request);
}
