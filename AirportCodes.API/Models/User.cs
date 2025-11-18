using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Models;

[Index(nameof(Email), IsUnique = true)]
public class User
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	[EmailAddress]
	[StringLength(256)]
	public string Email { get; set; } = string.Empty;

	[Required]
	[StringLength(500)]
	public string PasswordHash { get; set; } = string.Empty;

	[Required]
	public DateTime DateCreated { get; set; } = DateTime.UtcNow;

	[Required]
	public DateTime DateUpdated { get; set; } = DateTime.UtcNow;

	public DateTime? LastLogin { get; set; }
}
