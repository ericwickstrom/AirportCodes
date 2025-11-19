using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Models;

[Index(nameof(Name), IsUnique = true)]
public class Country
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	[StringLength(100)]
	public string Name { get; set; } = string.Empty;

	[StringLength(3)]
	public string? CountryCode { get; set; }

	// Navigation property
	public ICollection<City> Cities { get; set; } = new List<City>();
}
