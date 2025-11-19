using System.ComponentModel.DataAnnotations;

namespace AirportCodes.API.DTOs;

public class ConfirmEmailRequest
{
	[Required]
	public string Token { get; set; } = string.Empty;
}
