namespace AirportCodes.API.DTOs;

public class TestQuestionDto
{
	public Guid QuestionId { get; set; }
	public string AirportName { get; set; } = string.Empty;
	public string City { get; set; } = string.Empty;
	public string Country { get; set; } = string.Empty;
	public List<string> Options { get; set; } = new();
	public int QuestionNumber { get; set; }
	public int TotalQuestions { get; set; }
	public DateTime? TimerStartedAt { get; set; }
	public int? TimerDurationSeconds { get; set; }
	public DateTime? TimerExpiresAt { get; set; }
	public string? CustomTestName { get; set; }
}
