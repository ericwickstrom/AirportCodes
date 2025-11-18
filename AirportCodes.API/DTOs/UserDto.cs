namespace AirportCodes.API.DTOs;

public class UserDto
{
	public Guid Id { get; set; }
	public string Email { get; set; } = string.Empty;
	public DateTime DateCreated { get; set; }
	public DateTime? LastLogin { get; set; }
}
