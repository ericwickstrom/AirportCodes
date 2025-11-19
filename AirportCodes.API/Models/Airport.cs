using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Models;

[Index(nameof(IataCode), IsUnique = true)]
public class Airport
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	[StringLength(3, MinimumLength = 3)]
	public string IataCode { get; set; } = string.Empty;

	[Required]
	[StringLength(200)]
	public string AirportName { get; set; } = string.Empty;

	[Required]
	public Guid CityId { get; set; }

	// Navigation property
	public City City { get; set; } = null!;
}
