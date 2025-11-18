using AirportCodes.API.Data;
using AirportCodes.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Services;

public class AirportService : IAirportService
{
	private readonly AirportCodesDbContext _context;

	public AirportService(AirportCodesDbContext context)
	{
		_context = context;
	}

	public async Task<(IEnumerable<Airport> Airports, int TotalCount)> GetAllAsync(int page, int pageSize)
	{
		var totalCount = await _context.Airports.CountAsync();
		var airports = await _context.Airports
			.OrderBy(a => a.AirportName)
			.Skip((page - 1) * pageSize)
			.Take(pageSize)
			.ToListAsync();

		return (airports, totalCount);
	}

	public async Task<Airport?> GetByIdAsync(Guid id)
	{
		return await _context.Airports.FindAsync(id);
	}

	public async Task<Airport?> GetByIataCodeAsync(string iataCode)
	{
		return await _context.Airports
			.FirstOrDefaultAsync(a => a.IataCode == iataCode.ToUpper());
	}

	public async Task<IEnumerable<Airport>> GetRandomAsync(int count)
	{
		var totalCount = await _context.Airports.CountAsync();

		if (count >= totalCount)
		{
			return await _context.Airports.ToListAsync();
		}

		// Get random airports using a simple approach
		var allAirports = await _context.Airports.ToListAsync();
		var random = new Random();
		return allAirports.OrderBy(_ => random.Next()).Take(count).ToList();
	}
}
