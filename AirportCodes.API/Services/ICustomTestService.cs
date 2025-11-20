using AirportCodes.API.DTOs;

namespace AirportCodes.API.Services;

public interface ICustomTestService
{
	Task<CustomTestDetailDto> CreateCustomTestAsync(Guid userId, CreateCustomTestRequest request);
	Task<List<CustomTestDto>> GetUserCustomTestsAsync(Guid userId, bool includeDeleted = false);
	Task<CustomTestDetailDto?> GetCustomTestByIdAsync(Guid customTestId, Guid? userId = null);
	Task<CustomTestDetailDto> UpdateCustomTestAsync(Guid customTestId, Guid userId, UpdateCustomTestRequest request);
	Task<bool> SoftDeleteCustomTestAsync(Guid customTestId, Guid userId);
	Task<List<CustomTestDto>> GetPublicCustomTestsAsync();
	Task<bool> UserOwnsCustomTestAsync(Guid customTestId, Guid userId);
}
