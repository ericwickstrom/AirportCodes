using AirportCodes.API.DTOs;
using AirportCodes.API.Models;
using AirportCodes.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
	private readonly UserManager<User> _userManager;
	private readonly SignInManager<User> _signInManager;
	private readonly IJwtTokenService _jwtTokenService;
	private readonly ILogger<AuthController> _logger;

	public AuthController(
		UserManager<User> userManager,
		SignInManager<User> signInManager,
		IJwtTokenService jwtTokenService,
		ILogger<AuthController> logger)
	{
		_userManager = userManager;
		_signInManager = signInManager;
		_jwtTokenService = jwtTokenService;
		_logger = logger;
	}

	[HttpPost("register")]
	public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
	{
		var existingUser = await _userManager.FindByEmailAsync(request.Email);
		if (existingUser != null)
		{
			return BadRequest(new { message = "User with this email already exists" });
		}

		var user = new User
		{
			UserName = request.Email,
			Email = request.Email,
			DateCreated = DateTime.UtcNow,
			DateUpdated = DateTime.UtcNow
		};

		var result = await _userManager.CreateAsync(user, request.Password);

		if (!result.Succeeded)
		{
			return BadRequest(new { message = "User registration failed", errors = result.Errors });
		}

		var accessToken = _jwtTokenService.GenerateAccessToken(user);
		var refreshToken = _jwtTokenService.GenerateRefreshToken();

		user.RefreshToken = refreshToken;
		user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(
			int.Parse(HttpContext.RequestServices.GetRequiredService<IConfiguration>()["JwtSettings:RefreshTokenExpirationDays"] ?? "7")
		);
		user.LastLogin = DateTime.UtcNow;

		await _userManager.UpdateAsync(user);

		_logger.LogInformation("User registered successfully: {Email}", user.Email);

		return Ok(new AuthResponse
		{
			AccessToken = accessToken,
			RefreshToken = refreshToken,
			User = new UserDto
			{
				Id = user.Id,
				Email = user.Email ?? string.Empty,
				DateCreated = user.DateCreated,
				LastLogin = user.LastLogin
			}
		});
	}

	[HttpPost("login")]
	public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
	{
		var user = await _userManager.FindByEmailAsync(request.Email);
		if (user == null)
		{
			return Unauthorized(new { message = "Invalid email or password" });
		}

		var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: false);

		if (!result.Succeeded)
		{
			return Unauthorized(new { message = "Invalid email or password" });
		}

		var accessToken = _jwtTokenService.GenerateAccessToken(user);
		var refreshToken = _jwtTokenService.GenerateRefreshToken();

		user.RefreshToken = refreshToken;
		user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(
			int.Parse(HttpContext.RequestServices.GetRequiredService<IConfiguration>()["JwtSettings:RefreshTokenExpirationDays"] ?? "7")
		);
		user.LastLogin = DateTime.UtcNow;
		user.DateUpdated = DateTime.UtcNow;

		await _userManager.UpdateAsync(user);

		_logger.LogInformation("User logged in successfully: {Email}", user.Email);

		return Ok(new AuthResponse
		{
			AccessToken = accessToken,
			RefreshToken = refreshToken,
			User = new UserDto
			{
				Id = user.Id,
				Email = user.Email ?? string.Empty,
				DateCreated = user.DateCreated,
				LastLogin = user.LastLogin
			}
		});
	}

	[HttpPost("refresh")]
	public async Task<ActionResult<AuthResponse>> Refresh([FromBody] RefreshTokenRequest request)
	{
		var user = await _userManager.Users
			.FirstOrDefaultAsync(u => u.RefreshToken == request.RefreshToken);

		if (user == null || user.RefreshTokenExpiry == null || user.RefreshTokenExpiry <= DateTime.UtcNow)
		{
			return Unauthorized(new { message = "Invalid or expired refresh token" });
		}

		var accessToken = _jwtTokenService.GenerateAccessToken(user);
		var refreshToken = _jwtTokenService.GenerateRefreshToken();

		user.RefreshToken = refreshToken;
		user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(
			int.Parse(HttpContext.RequestServices.GetRequiredService<IConfiguration>()["JwtSettings:RefreshTokenExpirationDays"] ?? "7")
		);
		user.DateUpdated = DateTime.UtcNow;

		await _userManager.UpdateAsync(user);

		_logger.LogInformation("Token refreshed successfully for user: {Email}", user.Email);

		return Ok(new AuthResponse
		{
			AccessToken = accessToken,
			RefreshToken = refreshToken,
			User = new UserDto
			{
				Id = user.Id,
				Email = user.Email ?? string.Empty,
				DateCreated = user.DateCreated,
				LastLogin = user.LastLogin
			}
		});
	}

	[HttpPost("revoke")]
	public async Task<IActionResult> Revoke([FromBody] RefreshTokenRequest request)
	{
		var user = await _userManager.Users
			.FirstOrDefaultAsync(u => u.RefreshToken == request.RefreshToken);

		if (user == null)
		{
			return NotFound(new { message = "User not found" });
		}

		user.RefreshToken = null;
		user.RefreshTokenExpiry = null;
		user.DateUpdated = DateTime.UtcNow;

		await _userManager.UpdateAsync(user);

		_logger.LogInformation("Refresh token revoked for user: {Email}", user.Email);

		return Ok(new { message = "Token revoked successfully" });
	}
}
