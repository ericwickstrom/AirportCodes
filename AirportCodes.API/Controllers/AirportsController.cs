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

	/// <summary>
	/// Bulk lookup airports by IATA codes
	/// </summary>
	[HttpPost("bulk-lookup")]
	public async Task<ActionResult<BulkLookupResponse>> BulkLookupAirports([FromBody] BulkLookupRequest request)
	{
		if (request.IataCodes == null || !request.IataCodes.Any())
		{
			return BadRequest(new { error = "No IATA codes provided" });
		}

		if (request.IataCodes.Count > 1000)
		{
			return BadRequest(new { error = "Maximum 1000 codes allowed per request" });
		}

		var validAirports = new List<AirportDto>();
		var invalidCodes = new List<string>();

		foreach (var code in request.IataCodes)
		{
			var trimmedCode = code.Trim().ToUpper();
			if (string.IsNullOrWhiteSpace(trimmedCode))
			{
				continue;
			}

			var airports = await _airportService.SearchAsync(trimmedCode, 1);
			var exactMatch = airports.FirstOrDefault(a => a.IataCode.Equals(trimmedCode, StringComparison.OrdinalIgnoreCase));

			if (exactMatch != null)
			{
				// Avoid duplicates in the valid list
				if (!validAirports.Any(a => a.Id == exactMatch.Id))
				{
					validAirports.Add(new AirportDto
					{
						Id = exactMatch.Id,
						IataCode = exactMatch.IataCode,
						AirportName = exactMatch.AirportName,
						City = exactMatch.City.Name,
						Country = exactMatch.City.Country.Name
					});
				}
			}
			else
			{
				invalidCodes.Add(trimmedCode);
			}
		}

		return Ok(new BulkLookupResponse
		{
			ValidAirports = validAirports,
			InvalidCodes = invalidCodes
		});
	}
}
