namespace AirportCodes.API.Models;

public class TestSession
{
	public Guid SessionId { get; set; }
	public int TotalQuestions { get; set; }
	public int QuestionsAnswered { get; set; }
	public int CorrectAnswers { get; set; }
	public HashSet<int> UsedAirportIds { get; set; } = new();
	public DateTime CreatedAt { get; set; }
}
