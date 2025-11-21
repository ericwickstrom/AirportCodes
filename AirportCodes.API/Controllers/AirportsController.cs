using AirportCodes.API.DTOs;
using AirportCodes.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AirportCodes.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AirportsController : ControllerBase
{
	private readonly IAirportService _airportService;
	private readonly ILogger<AirportsController> _logger;

	public AirportsController(IAirportService airportService, ILogger<AirportsController> logger)
	{
		_airportService = airportService;
		_logger = logger;
	}

	/// <summary>
	/// Get all airports with pagination
	/// </summary>
	[HttpGet]
	public async Task<ActionResult<PaginatedResponse<AirportDto>>> GetAirports([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
	{
		if (page < 1 || pageSize < 1 || pageSize > 100)
		{
			return BadRequest(new { error = "Invalid pagination parameters" });
		}

		var (airports, totalCount) = await _airportService.GetAllAsync(page, pageSize);

		var airportDtos = airports.Select(a => new AirportDto
		{
			Id = a.Id,
			IataCode = a.IataCode,
			AirportName = a.AirportName,
			City = a.City.Name,
			Country = a.City.Country.Name
		});

		var response = new PaginatedResponse<AirportDto>
		{
			Data = airportDtos,
			Page = page,
			PageSize = pageSize,
			TotalCount = totalCount
		};

		return Ok(response);
	}

	/// <summary>
	/// Get a single airport by ID
	/// </summary>
	[HttpGet("{id}")]
	public async Task<ActionResult<AirportDto>> GetAirport(Guid id)
	{
		var airport = await _airportService.GetByIdAsync(id);

		if (airport == null)
		{
			return NotFound(new { error = "Airport not found" });
		}

		var airportDto = new AirportDto
		{
			Id = airport.Id,
			IataCode = airport.IataCode,
			AirportName = airport.AirportName,
			City = airport.City.Name,
			Country = airport.City.Country.Name
		};

		return Ok(airportDto);
	}

	/// <summary>
	/// Get random airports for quiz generation
	/// </summary>
	[HttpGet("random")]
	public async Task<ActionResult<IEnumerable<AirportDto>>> GetRandomAirports([FromQuery] int count = 4)
	{
		if (count < 1 || count > 20)
		{
			return BadRequest(new { error = "Count must be between 1 and 20" });
		}

		var airports = await _airportService.GetRandomAsync(count);

		var airportDtos = airports.Select(a => new AirportDto
		{
			Id = a.Id,
			IataCode = a.IataCode,
			AirportName = a.AirportName,
			City = a.City.Name,
			Country = a.City.Country.Name
		});

		return Ok(airportDtos);
	}

	/// <summary>
	/// Search airports by IATA code, airport name, or city name
	/// </summary>
	[HttpGet("search")]
	public async Task<ActionResult<IEnumerable<AirportDto>>> SearchAirports([FromQuery] string? q, [FromQuery] int limit = 20)
	{
		if (string.IsNullOrWhiteSpace(q))
		{
			return Ok(new List<AirportDto>());
		}

		if (limit < 1 || limit > 50)
		{
			return BadRequest(new { error = "Limit must be between 1 and 50" });
		}

		var airports = await _airportService.SearchAsync(q, limit);

		var airportDtos = airports.Select(a => new AirportDto
		{
			Id = a.Id,
			IataCode = a.IataCode,
			AirportName = a.AirportName,
			City = a.City.Name,
			Country = a.City.Country.Name
		});

		return Ok(airportDtos);
	}
}
