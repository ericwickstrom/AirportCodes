using System.ComponentModel.DataAnnotations;

namespace AirportCodes.API.Models;

public class CustomTestAirport
{
	[Required]
	public Guid CustomTestId { get; set; }

	[Required]
	public Guid AirportId { get; set; }

	// Navigation properties
	public CustomTest CustomTest { get; set; } = null!;
	public Airport Airport { get; set; } = null!;
}
