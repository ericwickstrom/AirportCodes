using AirportCodes.API.Models;

namespace AirportCodes.API.Services;

public interface IJwtTokenService
{
	string GenerateAccessToken(User user);
	string GenerateRefreshToken();
	Guid? ValidateToken(string token);
}
