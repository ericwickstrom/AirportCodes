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
			.Include(a => a.City)
				.ThenInclude(c => c.Country)
			.OrderBy(a => a.AirportName)
			.Skip((page - 1) * pageSize)
			.Take(pageSize)
			.ToListAsync();

		return (airports, totalCount);
	}

	public async Task<Airport?> GetByIdAsync(Guid id)
	{
		return await _context.Airports
			.Include(a => a.City)
				.ThenInclude(c => c.Country)
			.FirstOrDefaultAsync(a => a.Id == id);
	}

	public async Task<Airport?> GetByIataCodeAsync(string iataCode)
	{
		return await _context.Airports
			.Include(a => a.City)
				.ThenInclude(c => c.Country)
			.FirstOrDefaultAsync(a => a.IataCode == iataCode.ToUpper());
	}

	public async Task<IEnumerable<Airport>> GetRandomAsync(int count)
	{
		var totalCount = await _context.Airports.CountAsync();

		if (count >= totalCount)
		{
			return await _context.Airports
				.Include(a => a.City)
					.ThenInclude(c => c.Country)
				.ToListAsync();
		}

		// Get random airports using a simple approach
		var allAirports = await _context.Airports
			.Include(a => a.City)
				.ThenInclude(c => c.Country)
			.ToListAsync();
		var random = new Random();
		return allAirports.OrderBy(_ => random.Next()).Take(count).ToList();
	}

	public async Task<IEnumerable<Airport>> SearchAsync(string query, int limit = 20)
	{
		if (string.IsNullOrWhiteSpace(query))
		{
			return new List<Airport>();
		}

		var searchTerm = $"%{query}%";

		var airports = await _context.Airports
			.Include(a => a.City)
				.ThenInclude(c => c.Country)
			.Where(a =>
				EF.Functions.ILike(a.IataCode, searchTerm) ||
				EF.Functions.ILike(a.AirportName, searchTerm) ||
				EF.Functions.ILike(a.City.Name, searchTerm))
			.OrderBy(a => EF.Functions.ILike(a.IataCode, query + "%") ? 0 : 1)
			.ThenBy(a => a.IataCode)
			.Take(limit)
			.ToListAsync();

		return airports;
	}
}
