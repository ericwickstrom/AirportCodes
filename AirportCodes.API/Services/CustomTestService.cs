using AirportCodes.API.Data;
using AirportCodes.API.DTOs;
using AirportCodes.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Services;

public class CustomTestService : ICustomTestService
{
	private readonly AirportCodesDbContext _context;

	public CustomTestService(AirportCodesDbContext context)
	{
		_context = context;
	}

	public async Task<CustomTestDetailDto> CreateCustomTestAsync(Guid userId, CreateCustomTestRequest request)
	{
		// Validate that all airport IDs exist
		var airportIds = request.AirportIds.Distinct().ToList();
		var existingAirportIds = await _context.Airports
			.Where(a => airportIds.Contains(a.Id))
			.Select(a => a.Id)
			.ToListAsync();

		if (existingAirportIds.Count != airportIds.Count)
		{
			throw new ArgumentException("One or more airport IDs are invalid");
		}

		// Use transaction to ensure atomicity
		using var transaction = await _context.Database.BeginTransactionAsync();
		try
		{
			var customTest = new CustomTest
			{
				Id = Guid.NewGuid(),
				Name = request.Name,
				CreatedByUserId = userId,
				IsPublic = request.IsPublic,
				IsAnonymous = request.IsAnonymous,
				TimerEnabled = request.TimerEnabled,
				TimerDurationSeconds = request.TimerDurationSeconds,
				CreatedDate = DateTime.UtcNow,
				UpdatedDate = DateTime.UtcNow
			};

			_context.CustomTests.Add(customTest);
			await _context.SaveChangesAsync();

			// Bulk insert airport associations
			var customTestAirports = airportIds.Select(airportId => new CustomTestAirport
			{
				CustomTestId = customTest.Id,
				AirportId = airportId
			}).ToList();

			_context.CustomTestAirports.AddRange(customTestAirports);
			await _context.SaveChangesAsync();

			await transaction.CommitAsync();

			return await GetCustomTestByIdAsync(customTest.Id, userId)
				?? throw new InvalidOperationException("Failed to retrieve created custom test");
		}
		catch
		{
			await transaction.RollbackAsync();
			throw;
		}
	}

	public async Task<List<CustomTestDto>> GetUserCustomTestsAsync(Guid userId, bool includeDeleted = false)
	{
		var query = _context.CustomTests
			.Include(ct => ct.CreatedBy)
			.Include(ct => ct.CustomTestAirports)
			.Where(ct => ct.CreatedByUserId == userId);

		if (!includeDeleted)
		{
			query = query.Where(ct => !ct.IsDeleted);
		}

		var customTests = await query
			.OrderByDescending(ct => ct.CreatedDate)
			.ToListAsync();

		return customTests.Select(ct => new CustomTestDto
		{
			Id = ct.Id,
			Name = ct.Name,
			AirportCount = ct.CustomTestAirports.Count,
			IsPublic = ct.IsPublic,
			IsAnonymous = ct.IsAnonymous,
			CreatorName = ct.IsAnonymous ? null : ct.CreatedBy.UserName,
			TimerEnabled = ct.TimerEnabled,
			TimerDurationSeconds = ct.TimerDurationSeconds,
			IsDeleted = ct.IsDeleted,
			CreatedDate = ct.CreatedDate,
			UpdatedDate = ct.UpdatedDate
		}).ToList();
	}

	public async Task<CustomTestDetailDto?> GetCustomTestByIdAsync(Guid customTestId, Guid? userId = null)
	{
		var customTest = await _context.CustomTests
			.Include(ct => ct.CreatedBy)
			.Include(ct => ct.CustomTestAirports)
				.ThenInclude(cta => cta.Airport)
					.ThenInclude(a => a.City)
						.ThenInclude(c => c.Country)
			.FirstOrDefaultAsync(ct => ct.Id == customTestId);

		if (customTest == null)
		{
			return null;
		}

		// Check visibility - if not public, only creator can view
		if (!customTest.IsPublic && (userId == null || customTest.CreatedByUserId != userId))
		{
			return null;
		}

		return new CustomTestDetailDto
		{
			Id = customTest.Id,
			Name = customTest.Name,
			Airports = customTest.CustomTestAirports.Select(cta => new AirportDto
			{
				Id = cta.Airport.Id,
				IataCode = cta.Airport.IataCode,
				AirportName = cta.Airport.AirportName,
				City = cta.Airport.City.Name,
				Country = cta.Airport.City.Country.Name
			}).ToList(),
			IsPublic = customTest.IsPublic,
			IsAnonymous = customTest.IsAnonymous,
			CreatorName = customTest.IsAnonymous ? null : customTest.CreatedBy.UserName,
			TimerEnabled = customTest.TimerEnabled,
			TimerDurationSeconds = customTest.TimerDurationSeconds,
			IsDeleted = customTest.IsDeleted,
			CreatedDate = customTest.CreatedDate,
			UpdatedDate = customTest.UpdatedDate
		};
	}

	public async Task<CustomTestDetailDto> UpdateCustomTestAsync(Guid customTestId, Guid userId, UpdateCustomTestRequest request)
	{
		var customTest = await _context.CustomTests
			.Include(ct => ct.CustomTestAirports)
			.FirstOrDefaultAsync(ct => ct.Id == customTestId);

		if (customTest == null)
		{
			throw new KeyNotFoundException("Custom test not found");
		}

		if (customTest.CreatedByUserId != userId)
		{
			throw new UnauthorizedAccessException("You do not have permission to update this custom test");
		}

		// Validate that all airport IDs exist
		var airportIds = request.AirportIds.Distinct().ToList();
		var existingAirportIds = await _context.Airports
			.Where(a => airportIds.Contains(a.Id))
			.Select(a => a.Id)
			.ToListAsync();

		if (existingAirportIds.Count != airportIds.Count)
		{
			throw new ArgumentException("One or more airport IDs are invalid");
		}

		// Use transaction to ensure atomicity
		using var transaction = await _context.Database.BeginTransactionAsync();
		try
		{
			// Update custom test properties
			customTest.Name = request.Name;
			customTest.IsPublic = request.IsPublic;
			customTest.IsAnonymous = request.IsAnonymous;
			customTest.TimerEnabled = request.TimerEnabled;
			customTest.TimerDurationSeconds = request.TimerDurationSeconds;
			customTest.UpdatedDate = DateTime.UtcNow;

			// Remove all existing airport associations
			_context.CustomTestAirports.RemoveRange(customTest.CustomTestAirports);

			// Bulk insert new airport associations
			var customTestAirports = airportIds.Select(airportId => new CustomTestAirport
			{
				CustomTestId = customTest.Id,
				AirportId = airportId
			}).ToList();

			_context.CustomTestAirports.AddRange(customTestAirports);
			await _context.SaveChangesAsync();

			await transaction.CommitAsync();

			return await GetCustomTestByIdAsync(customTest.Id, userId)
				?? throw new InvalidOperationException("Failed to retrieve updated custom test");
		}
		catch
		{
			await transaction.RollbackAsync();
			throw;
		}
	}

	public async Task<bool> SoftDeleteCustomTestAsync(Guid customTestId, Guid userId)
	{
		var customTest = await _context.CustomTests
			.FirstOrDefaultAsync(ct => ct.Id == customTestId);

		if (customTest == null)
		{
			return false;
		}

		if (customTest.CreatedByUserId != userId)
		{
			throw new UnauthorizedAccessException("You do not have permission to delete this custom test");
		}

		customTest.IsDeleted = true;
		customTest.UpdatedDate = DateTime.UtcNow;

		await _context.SaveChangesAsync();

		return true;
	}

	public async Task<List<CustomTestDto>> GetPublicCustomTestsAsync(Guid? userId = null)
	{
		var customTests = await _context.CustomTests
			.Include(ct => ct.CreatedBy)
			.Include(ct => ct.CustomTestAirports)
			.Where(ct => ct.IsPublic && !ct.IsDeleted)
			.OrderByDescending(ct => ct.CreatedDate)
			.ToListAsync();

		// Get favorited test IDs if user is authenticated
		var favoritedIds = new HashSet<Guid>();
		if (userId.HasValue)
		{
			var favoritedList = await _context.UserFavoriteTests
				.Where(uft => uft.UserId == userId.Value)
				.Select(uft => uft.CustomTestId)
				.ToListAsync();
			favoritedIds = favoritedList.ToHashSet();
		}

		return customTests.Select(ct => new CustomTestDto
		{
			Id = ct.Id,
			Name = ct.Name,
			AirportCount = ct.CustomTestAirports.Count,
			IsPublic = ct.IsPublic,
			IsAnonymous = ct.IsAnonymous,
			CreatorName = ct.IsAnonymous ? null : ct.CreatedBy.UserName,
			TimerEnabled = ct.TimerEnabled,
			TimerDurationSeconds = ct.TimerDurationSeconds,
			IsDeleted = ct.IsDeleted,
			IsFavorited = favoritedIds.Contains(ct.Id),
			CreatedDate = ct.CreatedDate,
			UpdatedDate = ct.UpdatedDate
		}).ToList();
	}

	public async Task<List<CustomTestDto>> SearchPublicCustomTestsAsync(string query, Guid? userId = null)
	{
		var normalizedQuery = query.Trim().ToLower();

		var customTests = await _context.CustomTests
			.Include(ct => ct.CreatedBy)
			.Include(ct => ct.CustomTestAirports)
			.Where(ct => ct.IsPublic && !ct.IsDeleted && ct.Name.ToLower().Contains(normalizedQuery))
			.OrderByDescending(ct => ct.CreatedDate)
			.ToListAsync();

		// Get favorited test IDs if user is authenticated
		var favoritedIds = new HashSet<Guid>();
		if (userId.HasValue)
		{
			var favoritedList = await _context.UserFavoriteTests
				.Where(uft => uft.UserId == userId.Value)
				.Select(uft => uft.CustomTestId)
				.ToListAsync();
			favoritedIds = favoritedList.ToHashSet();
		}

		return customTests.Select(ct => new CustomTestDto
		{
			Id = ct.Id,
			Name = ct.Name,
			AirportCount = ct.CustomTestAirports.Count,
			IsPublic = ct.IsPublic,
			IsAnonymous = ct.IsAnonymous,
			CreatorName = ct.IsAnonymous ? null : ct.CreatedBy.UserName,
			TimerEnabled = ct.TimerEnabled,
			TimerDurationSeconds = ct.TimerDurationSeconds,
			IsDeleted = ct.IsDeleted,
			IsFavorited = favoritedIds.Contains(ct.Id),
			CreatedDate = ct.CreatedDate,
			UpdatedDate = ct.UpdatedDate
		}).ToList();
	}

	public async Task<bool> UserOwnsCustomTestAsync(Guid customTestId, Guid userId)
	{
		return await _context.CustomTests
			.AnyAsync(ct => ct.Id == customTestId && ct.CreatedByUserId == userId);
	}
}
