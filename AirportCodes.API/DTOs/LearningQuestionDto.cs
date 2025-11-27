namespace AirportCodes.API.DTOs;

public class LearningQuestionDto
{
	public Guid QuestionId { get; set; }
	public string AirportName { get; set; } = string.Empty;
	public string City { get; set; } = string.Empty;
	public string Country { get; set; } = string.Empty;
	public List<string> Options { get; set; } = new();
	public int? TotalQuestions { get; set; }
}
