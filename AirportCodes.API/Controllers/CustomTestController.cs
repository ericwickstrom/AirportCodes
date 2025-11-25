using System.Security.Claims;
using AirportCodes.API.DTOs;
using AirportCodes.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirportCodes.API.Controllers;

[ApiController]
[Route("api/custom-tests")]
public class CustomTestController : ControllerBase
{
	private readonly ICustomTestService _customTestService;
	private readonly ILogger<CustomTestController> _logger;

	public CustomTestController(ICustomTestService customTestService, ILogger<CustomTestController> logger)
	{
		_customTestService = customTestService;
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
	/// Create a new custom test
	/// </summary>
	[HttpPost]
	[Authorize]
	public async Task<ActionResult<CustomTestDetailDto>> CreateCustomTest([FromBody] CreateCustomTestRequest request)
	{
		try
		{
			var userId = GetCurrentUserId();
			var customTest = await _customTestService.CreateCustomTestAsync(userId, request);
			return CreatedAtAction(nameof(GetCustomTestById), new { id = customTest.Id }, customTest);
		}
		catch (ArgumentException ex)
		{
			_logger.LogWarning(ex, "Invalid request to create custom test");
			return BadRequest(new { message = ex.Message });
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to create custom test");
			return StatusCode(500, new { message = "An error occurred while creating the custom test" });
		}
	}

	/// <summary>
	/// Get all custom tests created by the current user
	/// </summary>
	[HttpGet]
	//[Authorize]
	public async Task<ActionResult<List<CustomTestDto>>> GetUserCustomTests([FromQuery] bool includeDeleted = false)
	{
		try
		{
			var userId = GetCurrentUserId();
			var customTests = await _customTestService.GetUserCustomTestsAsync(userId, includeDeleted);
			return Ok(customTests);
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to get user custom tests");
			return StatusCode(500, new { message = "An error occurred while retrieving custom tests" });
		}
	}

	/// <summary>
	/// Get a specific custom test by ID
	/// </summary>
	[HttpGet("{id}")]
	[AllowAnonymous]
	public async Task<ActionResult<CustomTestDetailDto>> GetCustomTestById(Guid id)
	{
		try
		{
			// Try to get user ID if authenticated, otherwise null
			Guid? userId = null;
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userIdClaim != null && Guid.TryParse(userIdClaim, out var parsedUserId))
			{
				userId = parsedUserId;
			}

			var customTest = await _customTestService.GetCustomTestByIdAsync(id, userId);

			if (customTest == null)
			{
				return NotFound(new { message = "Custom test not found or you do not have permission to view it" });
			}

			return Ok(customTest);
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to get custom test {CustomTestId}", id);
			return StatusCode(500, new { message = "An error occurred while retrieving the custom test" });
		}
	}

	/// <summary>
	/// Update an existing custom test
	/// </summary>
	[HttpPut("{id}")]
	[Authorize]
	public async Task<ActionResult<CustomTestDetailDto>> UpdateCustomTest(Guid id, [FromBody] UpdateCustomTestRequest request)
	{
		try
		{
			var userId = GetCurrentUserId();
			var customTest = await _customTestService.UpdateCustomTestAsync(id, userId, request);
			return Ok(customTest);
		}
		catch (KeyNotFoundException ex)
		{
			_logger.LogWarning(ex, "Custom test {CustomTestId} not found for update", id);
			return NotFound(new { message = ex.Message });
		}
		catch (UnauthorizedAccessException ex)
		{
			_logger.LogWarning(ex, "Unauthorized attempt to update custom test {CustomTestId}", id);
			return Forbid();
		}
		catch (ArgumentException ex)
		{
			_logger.LogWarning(ex, "Invalid request to update custom test {CustomTestId}", id);
			return BadRequest(new { message = ex.Message });
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to update custom test {CustomTestId}", id);
			return StatusCode(500, new { message = "An error occurred while updating the custom test" });
		}
	}

	/// <summary>
	/// Soft delete a custom test
	/// </summary>
	[HttpDelete("{id}")]
	[Authorize]
	public async Task<ActionResult> DeleteCustomTest(Guid id)
	{
		try
		{
			var userId = GetCurrentUserId();
			var deleted = await _customTestService.SoftDeleteCustomTestAsync(id, userId);

			if (!deleted)
			{
				return NotFound(new { message = "Custom test not found" });
			}

			return NoContent();
		}
		catch (UnauthorizedAccessException ex)
		{
			_logger.LogWarning(ex, "Unauthorized attempt to delete custom test {CustomTestId}", id);
			return Forbid();
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to delete custom test {CustomTestId}", id);
			return StatusCode(500, new { message = "An error occurred while deleting the custom test" });
		}
	}

	/// <summary>
	/// Get all public custom tests
	/// </summary>
	[HttpGet("public")]
	[AllowAnonymous]
	public async Task<ActionResult<List<CustomTestDto>>> GetPublicCustomTests()
	{
		try
		{
			var customTests = await _customTestService.GetPublicCustomTestsAsync();
			return Ok(customTests);
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to get public custom tests");
			return StatusCode(500, new { message = "An error occurred while retrieving public custom tests" });
		}
	}
}
