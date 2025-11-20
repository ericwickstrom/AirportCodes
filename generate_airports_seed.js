const fs = require('fs');
const crypto = require('crypto');

// Read airport data
const airportData = JSON.parse(fs.readFileSync('Docs/airport_data.json', 'utf8'));

// Read cities seed SQL to extract city UUIDs
const citiesSql = fs.readFileSync('AirportCodes.API/Data/SeedCities.sql', 'utf8');

// Parse city UUIDs from SQL
const cityMap = new Map();
const cityRegex = /VALUES \('([^']+)', '([^']+)', '[^']*'\)/g;
let match;
while ((match = cityRegex.exec(citiesSql)) !== null) {
	const [, uuid, cityName] = match;
	cityMap.set(cityName, uuid);
}

// Sort airports by IATA code
const airports = airportData.sort((a, b) => a.IataCode.localeCompare(b.IataCode));

// Generate SQL
console.log('-- Seed data for Airports table');
console.log('-- Generated from airport_data.json');
console.log(`-- Total airports: ${airports.length}`);
console.log();

airports.forEach(airport => {
	const cityUuid = cityMap.get(airport.CityName);
	if (!cityUuid) {
		console.error(`ERROR: City UUID not found for: ${airport.CityName}`);
		return;
	}

	const airportUuid = crypto.randomUUID();
	const airportName = airport.AirportName.replace(/'/g, "''");

	console.log(`INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")`);
	console.log(`VALUES ('${airportUuid}', '${airport.IataCode}', '${airportName}', '${cityUuid}')`);
	console.log(`ON CONFLICT ("IataCode") DO NOTHING;`);
	console.log();
});
