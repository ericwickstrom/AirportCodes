namespace AirportCodes.API.DTOs;

public class TestAnswerResponse
{
	public bool IsCorrect { get; set; }
	public string CorrectAnswer { get; set; } = string.Empty;
}
