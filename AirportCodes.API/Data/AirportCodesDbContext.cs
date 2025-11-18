using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Data;

public class AirportCodesDbContext : DbContext
{
	public AirportCodesDbContext(DbContextOptions<AirportCodesDbContext> options)
		: base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// Entity configurations will be added here as we create models
	}
}
