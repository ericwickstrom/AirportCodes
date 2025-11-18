using System.ComponentModel.DataAnnotations;

namespace AirportCodes.API.DTOs;

public class RefreshTokenRequest
{
	[Required]
	public string RefreshToken { get; set; } = string.Empty;
}
