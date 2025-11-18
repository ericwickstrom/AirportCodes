using AirportCodes.API.Data;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure database
builder.Services.AddDbContext<AirportCodesDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

// Seed database in development
if (app.Environment.IsDevelopment())
{
	using var scope = app.Services.CreateScope();
	var context = scope.ServiceProvider.GetRequiredService<AirportCodesDbContext>();
	SeedData.Initialize(context);
}

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
