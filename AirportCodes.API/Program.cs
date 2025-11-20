using System.Text;
using AirportCodes.API.Data;
using AirportCodes.API.Models;
using AirportCodes.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();

// Configure database
builder.Services.AddDbContext<AirportCodesDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Identity
builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
	// Password settings
	options.Password.RequireDigit = true;
	options.Password.RequireLowercase = true;
	options.Password.RequireUppercase = true;
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequiredLength = 6;

	// User settings
	options.User.RequireUniqueEmail = true;

	// Lockout settings (for future use)
	options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
	options.Lockout.MaxFailedAccessAttempts = 5;
})
.AddEntityFrameworkStores<AirportCodesDbContext>()
.AddDefaultTokenProviders();

// Configure JWT authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey not configured");

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = jwtSettings["Issuer"],
		ValidAudience = jwtSettings["Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
		ClockSkew = TimeSpan.Zero
	};
});

// Register application services
builder.Services.AddScoped<IAirportService, AirportService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IQuizService, QuizService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ICustomTestService, CustomTestService>();

// Configure CORS
var corsOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>() ?? new[] { "http://localhost:5173" };
builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(policy =>
	{
		policy.WithOrigins(corsOrigins)
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials();
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
else
{
	// Global exception handler for production
	app.UseExceptionHandler(errorApp =>
	{
		errorApp.Run(async context =>
		{
			var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
			var exceptionHandler = context.Features.Get<IExceptionHandlerFeature>();

			if (exceptionHandler?.Error != null)
			{
				logger.LogError(exceptionHandler.Error,
					"Unhandled exception occurred: {Message}",
					exceptionHandler.Error.Message);
			}

			context.Response.StatusCode = 500;
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsJsonAsync(new { error = "An internal server error occurred." });
		});
	});
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
