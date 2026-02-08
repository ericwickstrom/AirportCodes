using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Models;

[Index(nameof(UserId))]
[Index(nameof(CustomTestId))]
[Index(nameof(UserId), nameof(CustomTestId), IsUnique = true)]
public class UserFavoriteTest
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	public Guid UserId { get; set; }

	[Required]
	public Guid CustomTestId { get; set; }

	[Required]
	public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

	// Navigation properties
	public User User { get; set; } = null!;
	public CustomTest CustomTest { get; set; } = null!;
}
