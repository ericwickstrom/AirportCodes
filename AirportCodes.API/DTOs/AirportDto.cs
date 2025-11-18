namespace AirportCodes.API.DTOs;

public class AirportDto
{
	public Guid Id { get; set; }
	public string IataCode { get; set; } = string.Empty;
	public string AirportName { get; set; } = string.Empty;
	public string City { get; set; } = string.Empty;
	public string Country { get; set; } = string.Empty;
}
