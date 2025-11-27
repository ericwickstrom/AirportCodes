namespace AirportCodes.API.DTOs;

public class TestSessionDto
{
	public Guid SessionId { get; set; }
	public int TotalQuestions { get; set; }
	public DateTime? TimerStartedAt { get; set; }
	public int? TimerDurationSeconds { get; set; }
	public DateTime? TimerExpiresAt { get; set; }
}
