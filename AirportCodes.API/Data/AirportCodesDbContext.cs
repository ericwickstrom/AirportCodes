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
	public DbSet<Country> Countries { get; set; }
	public DbSet<City> Cities { get; set; }
	public DbSet<CustomTest> CustomTests { get; set; }
	public DbSet<CustomTestAirport> CustomTestAirports { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// Country configuration
		modelBuilder.Entity<Country>(entity =>
		{
			entity.HasKey(c => c.Id);
			entity.HasIndex(c => c.Name)
				.IsUnique();
		});

		// City configuration
		modelBuilder.Entity<City>(entity =>
		{
			entity.HasKey(c => c.Id);
			entity.HasIndex(c => c.CountryId);
			entity.HasOne(c => c.Country)
				.WithMany(co => co.Cities)
				.HasForeignKey(c => c.CountryId)
				.OnDelete(DeleteBehavior.Restrict);
		});

		// Airport configuration
		modelBuilder.Entity<Airport>(entity =>
		{
			entity.HasKey(a => a.Id);
			entity.Property(a => a.IataCode)
				.IsRequired()
				.HasMaxLength(3);
			entity.HasIndex(a => a.IataCode)
				.IsUnique();
			entity.HasIndex(a => a.CityId);
			entity.HasOne(a => a.City)
				.WithMany(c => c.Airports)
				.HasForeignKey(a => a.CityId)
				.OnDelete(DeleteBehavior.Restrict);
		});

		// User configuration - only custom properties (Identity handles the rest)
		modelBuilder.Entity<User>(entity =>
		{
			entity.Property(u => u.DateCreated)
				.HasDefaultValueSql("NOW()");
			entity.Property(u => u.DateUpdated)
				.HasDefaultValueSql("NOW()");
		});

		// CustomTest configuration
		modelBuilder.Entity<CustomTest>(entity =>
		{
			entity.HasKey(ct => ct.Id);
			entity.HasIndex(ct => ct.CreatedByUserId);
			entity.HasIndex(ct => ct.IsPublic);
			entity.HasIndex(ct => ct.IsDeleted);
			entity.HasOne(ct => ct.CreatedBy)
				.WithMany()
				.HasForeignKey(ct => ct.CreatedByUserId)
				.OnDelete(DeleteBehavior.Restrict);
			entity.Property(ct => ct.CreatedDate)
				.HasDefaultValueSql("NOW()");
			entity.Property(ct => ct.UpdatedDate)
				.HasDefaultValueSql("NOW()");
		});

		// CustomTestAirport configuration (junction table)
		modelBuilder.Entity<CustomTestAirport>(entity =>
		{
			entity.HasKey(cta => new { cta.CustomTestId, cta.AirportId });
			entity.HasOne(cta => cta.CustomTest)
				.WithMany(ct => ct.CustomTestAirports)
				.HasForeignKey(cta => cta.CustomTestId)
				.OnDelete(DeleteBehavior.Cascade);
			entity.HasOne(cta => cta.Airport)
				.WithMany()
				.HasForeignKey(cta => cta.AirportId)
				.OnDelete(DeleteBehavior.Restrict);
		});
	}
}
