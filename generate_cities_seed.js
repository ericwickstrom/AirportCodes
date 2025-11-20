const fs = require('fs');
const crypto = require('crypto');

// Read airport data
const airportData = JSON.parse(fs.readFileSync('Docs/airport_data.json', 'utf8'));

// Read countries seed SQL to extract country UUIDs
const countriesSql = fs.readFileSync('AirportCodes.API/Data/SeedCountries.sql', 'utf8');

// Parse country UUIDs from SQL
const countryMap = new Map();
const countryRegex = /VALUES \('([^']+)', '([^']+)', '[^']*'\)/g;
let match;
while ((match = countryRegex.exec(countriesSql)) !== null) {
	const [, uuid, countryName] = match;
	countryMap.set(countryName, uuid);
}

// Handle special case: "DE" country should map to Germany's UUID
const germanyUuid = countryMap.get('Germany');
if (germanyUuid && !countryMap.has('DE')) {
	countryMap.set('DE', germanyUuid);
}

// Extract unique cities
const citySet = new Set();
airportData.forEach(airport => {
	citySet.add(airport.CityName);
});

// Sort cities alphabetically
const cities = Array.from(citySet).sort();

// Generate UUIDs for cities (simple random UUIDs for now)
const cityUuids = cities.map(cityName => {
	return {
		name: cityName,
		uuid: crypto.randomUUID(),
		countryName: airportData.find(a => a.CityName === cityName).CountryName,
		countryUuid: null
	};
});

// Match cities to countries
cityUuids.forEach(city => {
	city.countryUuid = countryMap.get(city.countryName);
	if (!city.countryUuid) {
		console.error(`ERROR: Country UUID not found for: ${city.countryName}`);
	}
});

// Generate SQL
console.log('-- Seed data for Cities table');
console.log('-- Generated from airport_data.json');
console.log(`-- Total cities: ${cities.length}`);
console.log();

cityUuids.forEach(city => {
	if (city.countryUuid) {
		console.log(`INSERT INTO "Cities" ("Id", "Name", "CountryId")`);
		console.log(`VALUES ('${city.uuid}', '${city.name.replace(/'/g, "''")}', '${city.countryUuid}')`);
		console.log(`ON CONFLICT ("Name") DO NOTHING;`);
		console.log();
	}
});
