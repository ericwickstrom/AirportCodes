using AirportCodes.API.Data;
using AirportCodes.API.DTOs;
using AirportCodes.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Services;

public class FavoriteTestService : IFavoriteTestService
{
	private readonly AirportCodesDbContext _context;

	public FavoriteTestService(AirportCodesDbContext context)
	{
		_context = context;
	}

	public async Task<bool> AddFavoriteAsync(Guid userId, Guid customTestId)
	{
		// Verify the custom test exists and is public
		var customTest = await _context.CustomTests
			.FirstOrDefaultAsync(ct => ct.Id == customTestId);

		if (customTest == null)
		{
			throw new KeyNotFoundException("Custom test not found");
		}

		if (!customTest.IsPublic)
		{
			throw new InvalidOperationException("Cannot favorite a private test");
		}

		// Check if already favorited
		var existing = await _context.UserFavoriteTests
			.FirstOrDefaultAsync(uft => uft.UserId == userId && uft.CustomTestId == customTestId);

		if (existing != null)
		{
			return false; // Already favorited
		}

		// Add favorite
		var favorite = new UserFavoriteTest
		{
			Id = Guid.NewGuid(),
			UserId = userId,
			CustomTestId = customTestId,
			CreatedDate = DateTime.UtcNow
		};

		_context.UserFavoriteTests.Add(favorite);
		await _context.SaveChangesAsync();

		return true;
	}

	public async Task<bool> RemoveFavoriteAsync(Guid userId, Guid customTestId)
	{
		var favorite = await _context.UserFavoriteTests
			.FirstOrDefaultAsync(uft => uft.UserId == userId && uft.CustomTestId == customTestId);

		if (favorite == null)
		{
			return false; // Not favorited
		}

		_context.UserFavoriteTests.Remove(favorite);
		await _context.SaveChangesAsync();

		return true;
	}

	public async Task<bool> IsFavoritedAsync(Guid userId, Guid customTestId)
	{
		return await _context.UserFavoriteTests
			.AnyAsync(uft => uft.UserId == userId && uft.CustomTestId == customTestId);
	}

	public async Task<List<CustomTestDto>> GetUserFavoritesAsync(Guid userId)
	{
		var favorites = await _context.UserFavoriteTests
			.Include(uft => uft.CustomTest)
				.ThenInclude(ct => ct.CreatedBy)
			.Include(uft => uft.CustomTest)
				.ThenInclude(ct => ct.CustomTestAirports)
			.Where(uft => uft.UserId == userId && !uft.CustomTest.IsDeleted)
			.OrderByDescending(uft => uft.CreatedDate)
			.ToListAsync();

		return favorites.Select(uft => new CustomTestDto
		{
			Id = uft.CustomTest.Id,
			Name = uft.CustomTest.Name,
			AirportCount = uft.CustomTest.CustomTestAirports.Count,
			IsPublic = uft.CustomTest.IsPublic,
			IsAnonymous = uft.CustomTest.IsAnonymous,
			CreatorName = uft.CustomTest.IsAnonymous ? null : uft.CustomTest.CreatedBy.UserName,
			TimerEnabled = uft.CustomTest.TimerEnabled,
			TimerDurationSeconds = uft.CustomTest.TimerDurationSeconds,
			IsDeleted = uft.CustomTest.IsDeleted,
			IsFavorited = true, // Always true for favorites list
			CreatedDate = uft.CustomTest.CreatedDate,
			UpdatedDate = uft.CustomTest.UpdatedDate
		}).ToList();
	}
}
