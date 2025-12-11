using AirportCodes.API.DTOs;

namespace AirportCodes.API.Services;

public interface IFavoriteTestService
{
	Task<bool> AddFavoriteAsync(Guid userId, Guid customTestId);
	Task<bool> RemoveFavoriteAsync(Guid userId, Guid customTestId);
	Task<bool> IsFavoritedAsync(Guid userId, Guid customTestId);
	Task<List<CustomTestDto>> GetUserFavoritesAsync(Guid userId);
}
