using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using AirportCodes.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Data;

public static class SeedData
{
	public static void Initialize(AirportCodesDbContext context)
	{
		// Read airport data from JSON file
		var jsonPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "Docs", "airport_data.json");
		var jsonData = File.ReadAllText(jsonPath);
		var airportDataList = JsonSerializer.Deserialize<List<AirportData>>(jsonData);

		if (airportDataList == null || !airportDataList.Any())
		{
			throw new InvalidOperationException("Failed to load airport data from JSON file");
		}

		// Upsert countries
		var countryDict = new Dictionary<string, Country>();
		foreach (var data in airportDataList)
		{
			if (!countryDict.ContainsKey(data.CountryName))
			{
				var countryId = GenerateDeterministicGuid($"COUNTRY:{data.CountryName}");
				var existingCountry = context.Countries.FirstOrDefault(c => c.Id == countryId);

				if (existingCountry != null)
				{
					countryDict[data.CountryName] = existingCountry;
				}
				else
				{
					countryDict[data.CountryName] = new Country
					{
						Id = countryId,
						Name = data.CountryName
					};
				}
			}
		}

		// Add new countries to database
		var newCountries = countryDict.Values.Where(c => context.Countries.All(ec => ec.Id != c.Id)).ToList();
		if (newCountries.Any())
		{
			context.Countries.AddRange(newCountries);
			context.SaveChanges();
		}

		// Upsert cities with country references
		var cityDict = new Dictionary<string, City>(); // Key: "CityName|CountryName"
		foreach (var data in airportDataList)
		{
			var cityKey = $"{data.CityName}|{data.CountryName}";
			if (!cityDict.ContainsKey(cityKey))
			{
				var cityId = GenerateDeterministicGuid($"CITY:{data.CityName}|{data.CountryName}");
				var existingCity = context.Cities.FirstOrDefault(c => c.Id == cityId);

				if (existingCity != null)
				{
					cityDict[cityKey] = existingCity;
				}
				else
				{
					cityDict[cityKey] = new City
					{
						Id = cityId,
						Name = data.CityName,
						CountryId = countryDict[data.CountryName].Id
					};
				}
			}
		}

		// Add new cities to database
		var newCities = cityDict.Values.Where(c => context.Cities.All(ec => ec.Id != c.Id)).ToList();
		if (newCities.Any())
		{
			context.Cities.AddRange(newCities);
			context.SaveChanges();
		}

		// Upsert airports with city references
		foreach (var data in airportDataList)
		{
			var airportId = GenerateDeterministicGuid($"AIRPORT:{data.IataCode}");
			var existingAirport = context.Airports.FirstOrDefault(a => a.Id == airportId);
			var cityKey = $"{data.CityName}|{data.CountryName}";

			if (existingAirport != null)
			{
				// Update existing airport if data has changed
				existingAirport.AirportName = data.AirportName;
				existingAirport.CityId = cityDict[cityKey].Id;
			}
			else
			{
				// Insert new airport
				context.Airports.Add(new Airport
				{
					Id = airportId,
					IataCode = data.IataCode,
					AirportName = data.AirportName,
					CityId = cityDict[cityKey].Id
				});
			}
		}

		context.SaveChanges();
	}

	/// <summary>
	/// Generates a deterministic GUID from a string input using SHA256 hashing.
	/// Same input will always produce the same GUID.
	/// </summary>
	private static Guid GenerateDeterministicGuid(string input)
	{
		using var sha256 = SHA256.Create();
		var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));

		// Take first 16 bytes of hash to create GUID
		var guidBytes = new byte[16];
		Array.Copy(hash, guidBytes, 16);

		return new Guid(guidBytes);
	}

	private class AirportData
	{
		public string IataCode { get; set; } = string.Empty;
		public string AirportName { get; set; } = string.Empty;
		public string CityName { get; set; } = string.Empty;
		public string CountryName { get; set; } = string.Empty;
		public string? Source { get; set; }
	}
}
