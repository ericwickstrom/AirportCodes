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
		return;
		// Read airport data from JSON file
		// TODO: When re-enabling, use IWebHostEnvironment.ContentRootPath instead of relative path navigation
		// Example: var jsonPath = Path.Combine(hostEnvironment.ContentRootPath, "Docs", "airport_data.json");
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

	public static void SeedCustomTests(AirportCodesDbContext context)
	{
		// Skip if we already have custom tests
		if (context.CustomTests.Any())
		{
			return;
		}

		// Check if we have any users, create a placeholder user if not
		var firstUser = context.Users.FirstOrDefault();
		if (firstUser == null)
		{
			var placeholderUserId = GenerateDeterministicGuid("USER:placeholder@example.com");
			firstUser = new User
			{
				Id = placeholderUserId,
				UserName = "placeholder@example.com",
				NormalizedUserName = "PLACEHOLDER@EXAMPLE.COM",
				Email = "placeholder@example.com",
				NormalizedEmail = "PLACEHOLDER@EXAMPLE.COM",
				EmailConfirmed = true,
				SecurityStamp = Guid.NewGuid().ToString(),
				ConcurrencyStamp = Guid.NewGuid().ToString()
			};
			context.Users.Add(firstUser);
			context.SaveChanges();
		}

		// Get some random airports for the tests
		var airports = context.Airports.Take(50).ToList();
		if (!airports.Any())
		{
			// No airports, can't seed tests
			return;
		}

		var customTests = new List<CustomTest>();

		// Test 1: US Major Hubs
		var test1Id = GenerateDeterministicGuid("CUSTOM_TEST:US_Major_Hubs");
		if (!context.CustomTests.Any(t => t.Id == test1Id))
		{
			customTests.Add(new CustomTest
			{
				Id = test1Id,
				Name = "US Major Hubs",
				CreatedByUserId = firstUser.Id,
				IsPublic = true,
				IsAnonymous = false,
				TimerEnabled = true,
				TimerDurationSeconds = 300,
				IsDeleted = false
			});
		}

		// Test 2: European Capitals
		var test2Id = GenerateDeterministicGuid("CUSTOM_TEST:European_Capitals");
		if (!context.CustomTests.Any(t => t.Id == test2Id))
		{
			customTests.Add(new CustomTest
			{
				Id = test2Id,
				Name = "European Capitals",
				CreatedByUserId = firstUser.Id,
				IsPublic = true,
				IsAnonymous = false,
				TimerEnabled = false,
				IsDeleted = false
			});
		}

		// Test 3: Quick Practice (Private)
		var test3Id = GenerateDeterministicGuid("CUSTOM_TEST:Quick_Practice");
		if (!context.CustomTests.Any(t => t.Id == test3Id))
		{
			customTests.Add(new CustomTest
			{
				Id = test3Id,
				Name = "Quick Practice",
				CreatedByUserId = firstUser.Id,
				IsPublic = false,
				IsAnonymous = true,
				TimerEnabled = true,
				TimerDurationSeconds = 120,
				IsDeleted = false
			});
		}

		// Test 4: Asian Airports
		var test4Id = GenerateDeterministicGuid("CUSTOM_TEST:Asian_Airports");
		if (!context.CustomTests.Any(t => t.Id == test4Id))
		{
			customTests.Add(new CustomTest
			{
				Id = test4Id,
				Name = "Asian Airports",
				CreatedByUserId = firstUser.Id,
				IsPublic = true,
				IsAnonymous = false,
				TimerEnabled = true,
				TimerDurationSeconds = 600,
				IsDeleted = false
			});
		}

		// Test 5: Caribbean Islands (Deleted - to test filtering)
		var test5Id = GenerateDeterministicGuid("CUSTOM_TEST:Caribbean_Islands");
		if (!context.CustomTests.Any(t => t.Id == test5Id))
		{
			customTests.Add(new CustomTest
			{
				Id = test5Id,
				Name = "Caribbean Islands",
				CreatedByUserId = firstUser.Id,
				IsPublic = true,
				IsAnonymous = false,
				TimerEnabled = false,
				IsDeleted = true
			});
		}

		if (customTests.Any())
		{
			context.CustomTests.AddRange(customTests);
			context.SaveChanges();

			// Add airport associations for the tests (10 airports per test)
			var customTestAirports = new List<CustomTestAirport>();
			foreach (var test in customTests.Where(t => !t.IsDeleted))
			{
				var testAirports = airports.Take(10).Select(a => new CustomTestAirport
				{
					CustomTestId = test.Id,
					AirportId = a.Id
				}).ToList();

				customTestAirports.AddRange(testAirports);
			}

			if (customTestAirports.Any())
			{
				context.CustomTestAirports.AddRange(customTestAirports);
				context.SaveChanges();
			}
		}
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
