namespace AirportCodes.API.Models;

public class TestSession
{
	public Guid SessionId { get; set; }
	public int TotalQuestions { get; set; }
	public int QuestionsAnswered { get; set; }
	public int CorrectAnswers { get; set; }
	public HashSet<Guid> UsedAirportIds { get; set; } = new();
	public DateTime CreatedAt { get; set; }
	public Guid? CustomTestId { get; set; }
	public DateTime? TimerStartedAt { get; set; }
	public int? TimerDurationSeconds { get; set; }
	public DateTime? TimerExpiresAt { get; set; }
}
