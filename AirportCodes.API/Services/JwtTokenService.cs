using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AirportCodes.API.Models;
using Microsoft.IdentityModel.Tokens;

namespace AirportCodes.API.Services;

public class JwtTokenService : IJwtTokenService
{
	private readonly IConfiguration _configuration;

	public JwtTokenService(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public string GenerateAccessToken(User user)
	{
		var secretKey = _configuration["JwtSettings:SecretKey"]
			?? throw new InvalidOperationException("JWT SecretKey not configured");
		var issuer = _configuration["JwtSettings:Issuer"];
		var audience = _configuration["JwtSettings:Audience"];
		var expirationMinutes = int.Parse(_configuration["JwtSettings:AccessTokenExpirationMinutes"] ?? "15");

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
		var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var claims = new[]
		{
			new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
			new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
		};

		var token = new JwtSecurityToken(
			issuer: issuer,
			audience: audience,
			claims: claims,
			expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
			signingCredentials: credentials
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}

	public string GenerateRefreshToken()
	{
		var randomNumber = new byte[64];
		using var rng = RandomNumberGenerator.Create();
		rng.GetBytes(randomNumber);
		return Convert.ToBase64String(randomNumber);
	}

	public Guid? ValidateToken(string token)
	{
		var secretKey = _configuration["JwtSettings:SecretKey"];
		if (string.IsNullOrEmpty(secretKey))
			return null;

		var tokenHandler = new JwtSecurityTokenHandler();
		var key = Encoding.UTF8.GetBytes(secretKey);

		try
		{
			var validationParameters = new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateIssuer = true,
				ValidIssuer = _configuration["JwtSettings:Issuer"],
				ValidateAudience = true,
				ValidAudience = _configuration["JwtSettings:Audience"],
				ValidateLifetime = true,
				ClockSkew = TimeSpan.Zero
			};

			var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
			var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier) ?? principal.FindFirst(JwtRegisteredClaimNames.Sub);

			if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
			{
				return userId;
			}

			return null;
		}
		catch
		{
			return null;
		}
	}
}
