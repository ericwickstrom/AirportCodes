const fs = require('fs');
const crypto = require('crypto');

// Function to generate deterministic GUID matching C# implementation
function generateDeterministicGuid(input) {
	const hash = crypto.createHash('sha256').update(input, 'utf8').digest();
	const guidBytes = hash.slice(0, 16);
	return [
		guidBytes.slice(0, 4).toString('hex'),
		guidBytes.slice(4, 6).toString('hex'),
		guidBytes.slice(6, 8).toString('hex'),
		guidBytes.slice(8, 10).toString('hex'),
		guidBytes.slice(10, 16).toString('hex')
	].join('-');
}

// Read airport data
const data = JSON.parse(fs.readFileSync('Docs/airport_data.json', 'utf8'));

// Extract unique cities with their countries
const cityMap = new Map();
data.forEach(airport => {
	const key = `${airport.CityName}|${airport.CountryName}`;
	if (!cityMap.has(key)) {
		cityMap.set(key, {
			cityName: airport.CityName,
			countryName: airport.CountryName,
			cityId: generateDeterministicGuid(`CITY:${key}`),
			countryId: generateDeterministicGuid(`COUNTRY:${airport.CountryName}`)
		});
	}
});

// Sort by city name for consistent output
const cities = Array.from(cityMap.values()).sort((a, b) => a.cityName.localeCompare(b.cityName));

console.log(`-- Seed data for Cities table`);
console.log(`-- Generated from airport_data.json`);
console.log(`-- Total cities: ${cities.length}`);
console.log();

cities.forEach(city => {
	console.log(`INSERT INTO "Cities" ("Id", "Name", "CountryId")`);
	console.log(`VALUES ('${city.cityId}', '${city.cityName.replace(/'/g, "''")}', '${city.countryId}')`);
	console.log(`ON CONFLICT ("Id") DO NOTHING;`);
	console.log();
});
