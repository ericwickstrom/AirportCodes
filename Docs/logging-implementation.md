# Logging Configuration Implementation Plan

## Overview
Configure structured logging for the AirportCodes.API project to support development debugging and production monitoring.

## Objectives
- Enable detailed logging during development
- Configure appropriate logging levels for production
- Structure logs for easy parsing and analysis
- Prepare for future integration with logging services (e.g., Application Insights, Seq, Serilog)

---

## Implementation Steps

### 1. Configure Built-in ASP.NET Core Logging

**Status**: ✅ Already configured in appsettings.json

The default ASP.NET Core logging is already set up with appropriate levels:

**Development** (`appsettings.Development.json`):
- `Default`: Debug - Shows detailed application logs
- `Microsoft.AspNetCore`: Information - Shows HTTP requests/responses
- `Microsoft.EntityFrameworkCore`: Information - Shows SQL queries and DB operations

**Production** (`appsettings.json`):
- `Default`: Information - Balanced logging
- `Microsoft.AspNetCore`: Warning - Only warnings and errors
- `Microsoft.EntityFrameworkCore`: Warning - Only EF Core issues

### 2. Verify Logging in Program.cs

**Action**: Ensure logging is properly registered in the dependency injection container.

The default Web API template already includes:
```csharp
builder.Services.AddLogging();
```

This is typically implicit, but we should verify it's configured.

### 3. Add Request/Response Logging Middleware (Optional)

**When**: If needed for debugging API issues

**Implementation**:
- Add HTTP logging middleware to log incoming requests and outgoing responses
- Useful for debugging but can be verbose
- Should be disabled or filtered in production

**Code**:
```csharp
builder.Services.AddHttpLogging(options =>
{
	options.LoggingFields = HttpLoggingFields.RequestPath |
	                        HttpLoggingFields.RequestMethod |
	                        HttpLoggingFields.ResponseStatusCode;
});
```

### 4. Implement Structured Logging in Controllers/Services

**Action**: Use `ILogger<T>` in controllers and services

**Pattern**:
```csharp
public class AirportController : ControllerBase
{
	private readonly ILogger<AirportController> _logger;

	public AirportController(ILogger<AirportController> logger)
	{
		_logger = logger;
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetAirport(int id)
	{
		_logger.LogInformation("Fetching airport with ID: {AirportId}", id);
		// ... implementation
	}
}
```

### 5. Add Exception Logging Middleware

**Action**: Create global exception handler that logs unhandled exceptions

**Implementation**:
```csharp
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
		await context.Response.WriteAsJsonAsync(new { error = "An error occurred" });
	});
});
```

### 6. Future: Add Serilog (Optional Enhancement)

**When**: If we need more advanced logging features (file output, external sinks, etc.)

**Benefits**:
- Structured logging with better formatting
- Multiple sinks (file, database, external services)
- Better performance than default logger

**Packages**:
- `Serilog.AspNetCore`
- `Serilog.Sinks.Console`
- `Serilog.Sinks.File`
- `Serilog.Sinks.Seq` (for centralized logging)

**Decision**: Defer until needed. Built-in logging is sufficient for MVP.

---

## Log Levels Guide

### When to Use Each Level

- **Trace**: Very detailed, potentially high-volume logs (rarely used)
- **Debug**: Detailed debugging information (development only)
- **Information**: General informational messages (successful operations, key events)
- **Warning**: Unexpected behavior that doesn't stop execution (deprecated API usage, retries)
- **Error**: Errors that stop current operation but app continues (validation failures, exceptions)
- **Critical**: Serious errors that may cause app to crash (database unavailable, critical service down)

### Examples in Our App

```csharp
// Information - Successful operations
_logger.LogInformation("User {UserId} completed quiz with score {Score}", userId, score);

// Warning - Unexpected but handled
_logger.LogWarning("Airport with IATA code {Code} not found, returning empty result", code);

// Error - Operation failed
_logger.LogError(ex, "Failed to save user progress for user {UserId}", userId);

// Critical - System-level failure
_logger.LogCritical(ex, "Database connection failed. Application cannot start.");
```

---

## Best Practices

1. **Use structured logging**: Always use message templates with parameters, not string interpolation
   - ✅ `_logger.LogInformation("User {UserId} logged in", userId)`
   - ❌ `_logger.LogInformation($"User {userId} logged in")`

2. **Don't log sensitive data**: Avoid logging passwords, tokens, personal information

3. **Be consistent**: Use consistent naming for parameters across the application

4. **Log at appropriate levels**: Don't use Information for debugging details

5. **Include context**: Add relevant IDs, correlation IDs, user context

6. **Performance**: Don't log inside tight loops; be mindful of logging overhead

---

## Current Status

✅ **Completed**:
- appsettings.json configured with appropriate log levels
- Different levels for development vs production
- EF Core query logging enabled in development

⏳ **Pending**:
- Verify Program.cs logging configuration
- Add structured logging to controllers/services (as we build them)
- Implement global exception handler
- Test logging in development environment

🔮 **Future Enhancements**:
- Consider Serilog if advanced features needed
- Add Application Insights for production monitoring
- Implement log aggregation/search (Seq, Elasticsearch, etc.)

---

## Decision

**For MVP**: Use built-in ASP.NET Core logging. It's sufficient for our needs and follows the "pragmatic over dogma" principle. We can enhance later if needed.

**Action Items**:
1. ✅ appsettings.json configured
2. Verify Program.cs (next step)
3. Add global exception handler (next step)
4. Document logging patterns for team consistency
