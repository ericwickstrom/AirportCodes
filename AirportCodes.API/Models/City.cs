using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Models;

[Index(nameof(Name), IsUnique = true)]
public class City
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	[StringLength(100)]
	public string Name { get; set; } = string.Empty;

	[Required]
	public Guid CountryId { get; set; }

	// Navigation properties
	public Country Country { get; set; } = null!;
	public ICollection<Airport> Airports { get; set; } = new List<Airport>();
}
