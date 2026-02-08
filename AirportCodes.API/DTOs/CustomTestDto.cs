namespace AirportCodes.API.DTOs;

public class CustomTestDto
{
	public Guid Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public int AirportCount { get; set; }
	public bool IsPublic { get; set; }
	public bool IsAnonymous { get; set; }
	public string? CreatorName { get; set; } // null if anonymous
	public bool TimerEnabled { get; set; }
	public int? TimerDurationSeconds { get; set; }
	public bool IsDeleted { get; set; }
	public bool IsFavorited { get; set; } = false;
	public DateTime CreatedDate { get; set; }
	public DateTime UpdatedDate { get; set; }
}
