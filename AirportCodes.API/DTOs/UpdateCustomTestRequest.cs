using System.ComponentModel.DataAnnotations;

namespace AirportCodes.API.DTOs;

public class UpdateCustomTestRequest
{
	[Required]
	[StringLength(200, MinimumLength = 1)]
	public string Name { get; set; } = string.Empty;

	[Required]
	[MinLength(5, ErrorMessage = "At least 5 airports must be selected")]
	public List<Guid> AirportIds { get; set; } = new();

	public bool IsPublic { get; set; } = false;

	public bool IsAnonymous { get; set; } = false;

	public bool TimerEnabled { get; set; } = false;

	[Range(1, 7200, ErrorMessage = "Timer duration must be between 1 and 7200 seconds")]
	public int? TimerDurationSeconds { get; set; }
}
