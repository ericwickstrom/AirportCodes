namespace AirportCodes.API.DTOs;

public class LearningAnswerResponse
{
	public bool IsCorrect { get; set; }
	public string CorrectAnswer { get; set; } = string.Empty;
	public string Explanation { get; set; } = string.Empty;
}
