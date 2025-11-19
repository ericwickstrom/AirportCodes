using System.ComponentModel.DataAnnotations;

namespace AirportCodes.API.DTOs;

public class ResendConfirmationRequest
{
	[Required]
	[EmailAddress]
	public string Email { get; set; } = string.Empty;
}
