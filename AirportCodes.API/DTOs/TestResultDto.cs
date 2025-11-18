namespace AirportCodes.API.DTOs;

public class TestResultDto
{
	public int TotalQuestions { get; set; }
	public int CorrectAnswers { get; set; }
	public int IncorrectAnswers { get; set; }
	public double ScorePercentage { get; set; }
}
