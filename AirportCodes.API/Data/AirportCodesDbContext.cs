using AirportCodes.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Data;

public class AirportCodesDbContext : DbContext
{
	public AirportCodesDbContext(DbContextOptions<AirportCodesDbContext> options)
		: base(options)
	{
	}

	public DbSet<Airport> Airports { get; set; }
	public DbSet<User> Users { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// Airport configuration
		modelBuilder.Entity<Airport>(entity =>
		{
			entity.HasKey(a => a.Id);
			entity.Property(a => a.IataCode)
				.IsRequired()
				.HasMaxLength(3);
			entity.HasIndex(a => a.IataCode)
				.IsUnique();
		});

		// User configuration
		modelBuilder.Entity<User>(entity =>
		{
			entity.HasKey(u => u.Id);
			entity.Property(u => u.Email)
				.IsRequired()
				.HasMaxLength(256);
			entity.HasIndex(u => u.Email)
				.IsUnique();
			entity.Property(u => u.DateCreated)
				.HasDefaultValueSql("NOW()");
			entity.Property(u => u.DateUpdated)
				.HasDefaultValueSql("NOW()");
		});
	}
}
