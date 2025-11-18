using AirportCodes.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Data;

public static class SeedData
{
	public static void Initialize(AirportCodesDbContext context)
	{
		// Check if data already exists
		if (context.Airports.Any())
		{
			return; // Database has been seeded
		}

		var airports = new Airport[]
		{
			new Airport { Id = Guid.NewGuid(), IataCode = "ATL", AirportName = "Hartsfield-Jackson Atlanta International Airport", City = "Atlanta", Country = "United States" },
			new Airport { Id = Guid.NewGuid(), IataCode = "DXB", AirportName = "Dubai International Airport", City = "Dubai", Country = "United Arab Emirates" },
			new Airport { Id = Guid.NewGuid(), IataCode = "LAX", AirportName = "Los Angeles International Airport", City = "Los Angeles", Country = "United States" },
			new Airport { Id = Guid.NewGuid(), IataCode = "ORD", AirportName = "O'Hare International Airport", City = "Chicago", Country = "United States" },
			new Airport { Id = Guid.NewGuid(), IataCode = "LHR", AirportName = "London Heathrow Airport", City = "London", Country = "United Kingdom" },
			new Airport { Id = Guid.NewGuid(), IataCode = "HND", AirportName = "Tokyo Haneda Airport", City = "Tokyo", Country = "Japan" },
			new Airport { Id = Guid.NewGuid(), IataCode = "CDG", AirportName = "Charles de Gaulle Airport", City = "Paris", Country = "France" },
			new Airport { Id = Guid.NewGuid(), IataCode = "DFW", AirportName = "Dallas/Fort Worth International Airport", City = "Dallas", Country = "United States" },
			new Airport { Id = Guid.NewGuid(), IataCode = "JFK", AirportName = "John F. Kennedy International Airport", City = "New York", Country = "United States" },
			new Airport { Id = Guid.NewGuid(), IataCode = "SIN", AirportName = "Singapore Changi Airport", City = "Singapore", Country = "Singapore" },
			new Airport { Id = Guid.NewGuid(), IataCode = "ICN", AirportName = "Incheon International Airport", City = "Seoul", Country = "South Korea" },
			new Airport { Id = Guid.NewGuid(), IataCode = "SYD", AirportName = "Sydney Kingsford Smith Airport", City = "Sydney", Country = "Australia" },
			new Airport { Id = Guid.NewGuid(), IataCode = "FRA", AirportName = "Frankfurt Airport", City = "Frankfurt", Country = "Germany" },
			new Airport { Id = Guid.NewGuid(), IataCode = "AMS", AirportName = "Amsterdam Airport Schiphol", City = "Amsterdam", Country = "Netherlands" },
			new Airport { Id = Guid.NewGuid(), IataCode = "MAD", AirportName = "Adolfo Suárez Madrid-Barajas Airport", City = "Madrid", Country = "Spain" },
			new Airport { Id = Guid.NewGuid(), IataCode = "YYZ", AirportName = "Toronto Pearson International Airport", City = "Toronto", Country = "Canada" },
			new Airport { Id = Guid.NewGuid(), IataCode = "MEX", AirportName = "Mexico City International Airport", City = "Mexico City", Country = "Mexico" },
			new Airport { Id = Guid.NewGuid(), IataCode = "GRU", AirportName = "São Paulo/Guarulhos International Airport", City = "São Paulo", Country = "Brazil" },
			new Airport { Id = Guid.NewGuid(), IataCode = "IST", AirportName = "Istanbul Airport", City = "Istanbul", Country = "Turkey" },
			new Airport { Id = Guid.NewGuid(), IataCode = "BKK", AirportName = "Suvarnabhumi Airport", City = "Bangkok", Country = "Thailand" }
		};

		context.Airports.AddRange(airports);
		context.SaveChanges();
	}
}
