using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Models;

[Index(nameof(CreatedByUserId))]
[Index(nameof(IsPublic))]
[Index(nameof(IsDeleted))]
public class CustomTest
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	[StringLength(200)]
	public string Name { get; set; } = string.Empty;

	[Required]
	public Guid CreatedByUserId { get; set; }

	public bool IsPublic { get; set; } = false;

	public bool IsAnonymous { get; set; } = false;

	public bool TimerEnabled { get; set; } = false;

	public int? TimerDurationSeconds { get; set; }

	public bool IsDeleted { get; set; } = false;

	[Required]
	public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

	[Required]
	public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;

	// Navigation properties
	public User CreatedBy { get; set; } = null!;
	public ICollection<CustomTestAirport> CustomTestAirports { get; set; } = new List<CustomTestAirport>();
}
