using AirportCodes.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AirportCodes.API.Data;

public class AirportCodesDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
	public AirportCodesDbContext(DbContextOptions<AirportCodesDbContext> options)
		: base(options)
	{
	}

	public DbSet<Airport> Airports { get; set; }

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

		// User configuration - only custom properties (Identity handles the rest)
		modelBuilder.Entity<User>(entity =>
		{
			entity.Property(u => u.DateCreated)
				.HasDefaultValueSql("NOW()");
			entity.Property(u => u.DateUpdated)
				.HasDefaultValueSql("NOW()");
		});
	}
}
