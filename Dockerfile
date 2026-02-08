# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["AirportCodes.API/AirportCodes.API.csproj", "AirportCodes.API/"]
RUN dotnet restore "AirportCodes.API/AirportCodes.API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/AirportCodes.API"
RUN dotnet build "AirportCodes.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "AirportCodes.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080

# Copy published output
COPY --from=publish /app/publish .

# Copy seed data SQL files
COPY ["AirportCodes.API/Data/SeedCountries.sql", "Data/"]
COPY ["AirportCodes.API/Data/SeedCities.sql", "Data/"]
COPY ["AirportCodes.API/Data/SeedAirports.sql", "Data/"]

ENTRYPOINT ["dotnet", "AirportCodes.API.dll"]
