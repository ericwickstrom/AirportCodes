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
	private readonly IEmailService _emailService;
	private readonly IConfiguration _configuration;
	private readonly ILogger<AuthController> _logger;

	public AuthController(
		UserManager<User> userManager,
		SignInManager<User> signInManager,
		IJwtTokenService jwtTokenService,
		IEmailService emailService,
		IConfiguration configuration,
		ILogger<AuthController> logger)
	{
		_userManager = userManager;
		_signInManager = signInManager;
		_jwtTokenService = jwtTokenService;
		_emailService = emailService;
		_configuration = configuration;
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
			DateUpdated = DateTime.UtcNow,
			EmailConfirmed = true // TODO: Set to false when email confirmation is enabled
		};

		var result = await _userManager.CreateAsync(user, request.Password);

		if (!result.Succeeded)
		{
			return BadRequest(new { message = "User registration failed", errors = result.Errors });
		}

		// TODO: Enable email confirmation later
		// Generate email confirmation token
		// var confirmationToken = Guid.NewGuid().ToString();
		// var tokenExpiration = int.Parse(_configuration["EmailSettings:ConfirmationTokenExpirationHours"] ?? "24");
		// user.EmailConfirmationToken = confirmationToken;
		// user.EmailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(tokenExpiration);
		// Send confirmation email
		// await _emailService.SendEmailConfirmationAsync(user.Email!, confirmationToken);

		// Auto-login after registration (for now, until email confirmation is enabled)
		var accessToken = _jwtTokenService.GenerateAccessToken(user);
		var refreshToken = _jwtTokenService.GenerateRefreshToken();

		user.RefreshToken = refreshToken;
		user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(
			int.Parse(_configuration["JwtSettings:RefreshTokenExpirationDays"] ?? "7")
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

		// TODO: Enable email confirmation check when ready
		// Check if email is confirmed
		// if (!user.EmailConfirmed)
		// {
		// 	return Unauthorized(new { message = "Please confirm your email address before logging in", emailNotConfirmed = true });
		// }

		var accessToken = _jwtTokenService.GenerateAccessToken(user);
		var refreshToken = _jwtTokenService.GenerateRefreshToken();

		user.RefreshToken = refreshToken;
		user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(
			int.Parse(_configuration["JwtSettings:RefreshTokenExpirationDays"] ?? "7")
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

	[HttpPost("confirm-email")]
	public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest request)
	{
		var user = await _userManager.Users
			.FirstOrDefaultAsync(u => u.EmailConfirmationToken == request.Token);

		if (user == null)
		{
			return BadRequest(new { message = "Invalid confirmation token" });
		}

		if (user.EmailConfirmationTokenExpiry == null || user.EmailConfirmationTokenExpiry <= DateTime.UtcNow)
		{
			return BadRequest(new { message = "Confirmation token has expired" });
		}

		if (user.EmailConfirmed)
		{
			return BadRequest(new { message = "Email is already confirmed" });
		}

		user.EmailConfirmed = true;
		user.EmailConfirmationToken = null;
		user.EmailConfirmationTokenExpiry = null;
		user.DateUpdated = DateTime.UtcNow;

		await _userManager.UpdateAsync(user);

		_logger.LogInformation("Email confirmed successfully for user: {Email}", user.Email);

		return Ok(new { message = "Email confirmed successfully. You can now log in." });
	}

	[HttpPost("resend-confirmation")]
	public async Task<IActionResult> ResendConfirmation([FromBody] ResendConfirmationRequest request)
	{
		var user = await _userManager.FindByEmailAsync(request.Email);

		if (user == null)
		{
			// Don't reveal that the user doesn't exist
			return Ok(new { message = "If an account exists with this email, a confirmation email has been sent." });
		}

		if (user.EmailConfirmed)
		{
			return BadRequest(new { message = "Email is already confirmed" });
		}

		// Generate new confirmation token
		var confirmationToken = Guid.NewGuid().ToString();
		var tokenExpiration = int.Parse(_configuration["EmailSettings:ConfirmationTokenExpirationHours"] ?? "24");

		user.EmailConfirmationToken = confirmationToken;
		user.EmailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(tokenExpiration);
		user.DateUpdated = DateTime.UtcNow;

		await _userManager.UpdateAsync(user);

		// Send confirmation email
		try
		{
			await _emailService.SendEmailConfirmationAsync(user.Email!, confirmationToken);
			_logger.LogInformation("Confirmation email resent to: {Email}", user.Email);
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to resend confirmation email to {Email}", user.Email);
			return StatusCode(500, new { message = "Failed to send confirmation email. Please try again later." });
		}

		return Ok(new { message = "Confirmation email has been sent. Please check your inbox." });
	}
}
