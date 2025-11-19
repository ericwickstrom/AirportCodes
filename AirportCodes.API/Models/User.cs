using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace AirportCodes.API.Models;

public class User : IdentityUser<Guid>
{
	[Required]
	public DateTime DateCreated { get; set; } = DateTime.UtcNow;

	[Required]
	public DateTime DateUpdated { get; set; } = DateTime.UtcNow;

	public DateTime? LastLogin { get; set; }

	public string? RefreshToken { get; set; }

	public DateTime? RefreshTokenExpiry { get; set; }

	public string? EmailConfirmationToken { get; set; }

	public DateTime? EmailConfirmationTokenExpiry { get; set; }
}
