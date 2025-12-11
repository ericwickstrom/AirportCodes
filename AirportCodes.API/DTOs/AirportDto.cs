using System.ComponentModel.DataAnnotations;

namespace AirportCodes.API.DTOs;

public class AirportDto
{
	public Guid Id { get; set; }
	public string IataCode { get; set; } = string.Empty;
	public string AirportName { get; set; } = string.Empty;
	public string City { get; set; } = string.Empty;
	public string Country { get; set; } = string.Empty;
}

public class BulkLookupRequest
{
	[Required]
	[MaxLength(1000)]
	public List<string> IataCodes { get; set; } = new();
}

public class BulkLookupResponse
{
	public List<AirportDto> ValidAirports { get; set; } = new();
	public List<string> InvalidCodes { get; set; } = new();
}
