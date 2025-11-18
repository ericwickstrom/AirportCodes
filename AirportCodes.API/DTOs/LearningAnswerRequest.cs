using System.ComponentModel.DataAnnotations;

namespace AirportCodes.API.DTOs;

public class LearningAnswerRequest
{
	[Required]
	public Guid QuestionId { get; set; }

	[Required]
	[StringLength(3, MinimumLength = 3)]
	public string SelectedAnswer { get; set; } = string.Empty;
}
