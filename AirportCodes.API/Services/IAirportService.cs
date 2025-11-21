using AirportCodes.API.Models;

namespace AirportCodes.API.Services;

public interface IAirportService
{
	Task<(IEnumerable<Airport> Airports, int TotalCount)> GetAllAsync(int page, int pageSize);
	Task<Airport?> GetByIdAsync(Guid id);
	Task<Airport?> GetByIataCodeAsync(string iataCode);
	Task<IEnumerable<Airport>> GetRandomAsync(int count);
	Task<IEnumerable<Airport>> SearchAsync(string query, int limit = 20);
}
