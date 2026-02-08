using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirportCodes.API.Data;

namespace AirportCodes.API.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
	private readonly AirportCodesDbContext _context;
	private readonly ILogger<HealthController> _logger;

	public HealthController(
		AirportCodesDbContext context,
		ILogger<HealthController> logger)
	{
		_context = context;
		_logger = logger;
	}

	[HttpGet]
	public async Task<IActionResult> Get()
	{
		try
		{
			// Check database connectivity
			await _context.Database.CanConnectAsync();

			return Ok(new
			{
				status = "healthy",
				timestamp = DateTime.UtcNow,
				database = "connected"
			});
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Health check failed");

			return StatusCode(503, new
			{
				status = "unhealthy",
				timestamp = DateTime.UtcNow,
				database = "disconnected",
				error = ex.Message
			});
		}
	}
}