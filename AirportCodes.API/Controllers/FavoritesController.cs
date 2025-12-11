using System.Security.Claims;
using AirportCodes.API.DTOs;
using AirportCodes.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirportCodes.API.Controllers;

[ApiController]
[Route("api/favorites")]
[Authorize]
public class FavoritesController : ControllerBase
{
	private readonly IFavoriteTestService _favoriteTestService;
	private readonly ILogger<FavoritesController> _logger;

	public FavoritesController(IFavoriteTestService favoriteTestService, ILogger<FavoritesController> logger)
	{
		_favoriteTestService = favoriteTestService;
		_logger = logger;
	}

	private Guid GetCurrentUserId()
	{
		var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
		if (userIdClaim == null || !Guid.TryParse(userIdClaim, out var userId))
		{
			throw new UnauthorizedAccessException("User ID not found in token");
		}
		return userId;
	}

	/// <summary>
	/// Add a custom test to user's favorites
	/// </summary>
	[HttpPost]
	public async Task<ActionResult> AddFavorite([FromBody] FavoriteRequest request)
	{
		try
		{
			var userId = GetCurrentUserId();
			var added = await _favoriteTestService.AddFavoriteAsync(userId, request.CustomTestId);

			if (!added)
			{
				return Ok(new { message = "Test already favorited" });
			}

			return Ok(new { message = "Test added to favorites" });
		}
		catch (KeyNotFoundException ex)
		{
			_logger.LogWarning(ex, "Custom test {CustomTestId} not found", request.CustomTestId);
			return NotFound(new { message = ex.Message });
		}
		catch (InvalidOperationException ex)
		{
			_logger.LogWarning(ex, "Cannot favorite test {CustomTestId}", request.CustomTestId);
			return BadRequest(new { message = ex.Message });
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to add favorite for test {CustomTestId}", request.CustomTestId);
			return StatusCode(500, new { message = "An error occurred while adding favorite" });
		}
	}

	/// <summary>
	/// Remove a custom test from user's favorites
	/// </summary>
	[HttpDelete("{customTestId}")]
	public async Task<ActionResult> RemoveFavorite(Guid customTestId)
	{
		try
		{
			var userId = GetCurrentUserId();
			var removed = await _favoriteTestService.RemoveFavoriteAsync(userId, customTestId);

			if (!removed)
			{
				return NotFound(new { message = "Test not in favorites" });
			}

			return Ok(new { message = "Test removed from favorites" });
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to remove favorite for test {CustomTestId}", customTestId);
			return StatusCode(500, new { message = "An error occurred while removing favorite" });
		}
	}

	/// <summary>
	/// Get all favorited tests for the current user
	/// </summary>
	[HttpGet]
	public async Task<ActionResult<List<CustomTestDto>>> GetUserFavorites()
	{
		try
		{
			var userId = GetCurrentUserId();
			var favorites = await _favoriteTestService.GetUserFavoritesAsync(userId);
			return Ok(favorites);
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to get user favorites");
			return StatusCode(500, new { message = "An error occurred while retrieving favorites" });
		}
	}
}

public class FavoriteRequest
{
	public Guid CustomTestId { get; set; }
}
