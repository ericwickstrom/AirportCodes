import csv
import json

# The 212 IATA codes we need
TARGET_IATA_CODES = [
	"ACA", "AGS", "ALB", "ABQ", "AMM", "AMS", "ANC", "ANU", "AUA", "ATH", "ATL", "AUS",
	"BDL", "BER", "BDA", "BHM", "BIL", "BIS", "BOG", "BOI", "BOM", "BOS", "BKK", "BUR",
	"BTM", "BWI", "BZE", "BCN", "BRU", "BUF", "BUD", "BZN", "CAE", "CAI", "CCS", "CDC",
	"CDG", "CHA", "CHS", "CLE", "CLT", "CMH", "COS", "CPH", "CPR", "CUN", "CVG", "CZM",
	"DAB", "DAL", "DAY", "DCA", "DEN", "DFW", "DLH", "DSM", "DSS", "DTW", "DUB", "DUS",
	"DXB", "EGE", "ELP", "EWR", "EYW", "EZE", "FAI", "FAR", "FAT", "FCA", "FCO", "FLL",
	"FNT", "FRA", "FSD", "GCM", "GDL", "GEG", "GIG", "GPT", "GRB", "GRR", "GRU", "GSP",
	"GTF", "GUA", "GUC", "GUM", "HDN", "HKG", "HLN", "HNL", "HOU", "HSV", "IAD", "IAH",
	"IDA", "IND", "IST", "JAC", "JAN", "JAX", "JFK", "JNB", "KIX", "KOA", "KWI", "LAS",
	"LAX", "LEX", "LGA", "LGB", "LGW", "LHR", "LIH", "LIM", "LIR", "LIT", "LOS", "MAD",
	"MAN", "MBJ", "MCI", "MCO", "MDW", "MEM", "MEX", "MFR", "MHT", "MIA", "MKE", "MLB",
	"MNL", "MSN", "MSO", "MSP", "MSY", "MTJ", "MUC", "MXP", "MYR", "MZT", "NAS", "NCE",
	"NGO", "NRT", "OAK", "OGG", "OMA", "ONT", "ORD", "ORF", "PBI", "PDX", "PEK", "PHL",
	"PHX", "PIT", "PNS", "PRG", "PSC", "PSP", "PTY", "PVD", "PVR", "RAP", "RDU", "RIC",
	"RNO", "ROC", "RSW", "SAN", "SAT", "SAV", "SCL", "SDF", "SEA", "SFO", "SGU", "SIN",
	"SJC", "SJD", "SJO", "SJU", "SLC", "SMF", "SNA", "SNN", "SPN", "SRQ", "STL", "STR",
	"STT", "SUN", "SVO", "SYD", "TLH", "TLV", "TPA", "TPE", "TUS", "TYS", "UVF", "VCE",
	"YEG", "YUL", "YVR", "YWG", "YYC", "ZRH", "BNA"
]

target_set = set(TARGET_IATA_CODES)

# Data structure to hold results
airports = {}

print(f"Looking for {len(TARGET_IATA_CODES)} IATA codes...")

# Process OpenFlights data first
print("\nProcessing OpenFlights data...")
openflights_found = 0
try:
	with open('C:\\Users\\wicks\\source\\repos\\AirportCodes\\Docs\\openflights_airports.dat', 'r', encoding='utf-8') as f:
		reader = csv.reader(f)
		for row in reader:
			if len(row) >= 5:
				# Format: ID, Name, City, Country, IATA, ICAO, Lat, Lon, ...
				iata_code = row[4].strip()
				if iata_code in target_set and iata_code not in airports:
					airports[iata_code] = {
						'IataCode': iata_code,
						'AirportName': row[1].strip(),
						'CityName': row[2].strip(),
						'CountryName': row[3].strip(),
						'Source': 'OpenFlights'
					}
					openflights_found += 1
	print(f"Found {openflights_found} airports from OpenFlights")
except Exception as e:
	print(f"Error processing OpenFlights: {e}")

# Process OurAirports data to fill in gaps
print("\nProcessing OurAirports data...")
ourairports_found = 0
ourairports_updated = 0
try:
	with open('C:\\Users\\wicks\\source\\repos\\AirportCodes\\Docs\\ourairports.csv', 'r', encoding='utf-8') as f:
		reader = csv.DictReader(f)
		for row in reader:
			iata_code = row.get('iata_code', '').strip()
			if iata_code in target_set:
				if iata_code not in airports:
					# New airport found
					airports[iata_code] = {
						'IataCode': iata_code,
						'AirportName': row['name'].strip(),
						'CityName': row.get('municipality', '').strip() or 'N/A',
						'CountryName': row.get('iso_country', '').strip(),
						'Source': 'OurAirports'
					}
					ourairports_found += 1
				else:
					# Airport already exists, but OurAirports might have better data
					# (especially for municipality/city)
					if not airports[iata_code]['CityName'] or airports[iata_code]['CityName'] == 'N/A':
						municipality = row.get('municipality', '').strip()
						if municipality:
							airports[iata_code]['CityName'] = municipality
							airports[iata_code]['Source'] = 'OpenFlights + OurAirports'
							ourairports_updated += 1
	print(f"Found {ourairports_found} new airports from OurAirports")
	print(f"Updated {ourairports_updated} airports with OurAirports data")
except Exception as e:
	print(f"Error processing OurAirports: {e}")

# Sort by IATA code
sorted_airports = sorted(airports.values(), key=lambda x: x['IataCode'])

# Report on missing codes
missing_codes = target_set - set(airports.keys())
if missing_codes:
	print(f"\nWARNING: {len(missing_codes)} codes not found in either dataset:")
	print(sorted(missing_codes))
else:
	print(f"\nSUCCESS: All {len(TARGET_IATA_CODES)} airport codes found!")

print(f"\nTotal airports in result: {len(airports)}")

# Save as JSON
output_json = 'C:\\Users\\wicks\\source\\repos\\AirportCodes\\Docs\\airport_data.json'
with open(output_json, 'w', encoding='utf-8') as f:
	json.dump(sorted_airports, f, indent=2, ensure_ascii=False)
print(f"\nJSON output saved to: {output_json}")

# Save as CSV
output_csv = 'C:\\Users\\wicks\\source\\repos\\AirportCodes\\Docs\\airport_data.csv'
with open(output_csv, 'w', newline='', encoding='utf-8') as f:
	if sorted_airports:
		writer = csv.DictWriter(f, fieldnames=['IataCode', 'AirportName', 'CityName', 'CountryName', 'Source'])
		writer.writeheader()
		writer.writerows(sorted_airports)
print(f"CSV output saved to: {output_csv}")

# Print data quality report
print("\n" + "="*60)
print("DATA QUALITY REPORT")
print("="*60)

# Check for N/A or empty values
issues = []
for airport in sorted_airports:
	problems = []
	if not airport['AirportName']:
		problems.append('Missing airport name')
	if not airport['CityName'] or airport['CityName'] == 'N/A':
		problems.append('Missing city name')
	if not airport['CountryName']:
		problems.append('Missing country name')

	if problems:
		issues.append(f"{airport['IataCode']}: {', '.join(problems)}")

if issues:
	print(f"\nData quality issues found for {len(issues)} airports:")
	for issue in issues:
		print(f"  - {issue}")
else:
	print("\nNo data quality issues detected!")

# Source breakdown
from collections import Counter
sources = Counter(airport['Source'] for airport in sorted_airports)
print("\nData sources:")
for source, count in sources.items():
	print(f"  - {source}: {count} airports")

print("\n" + "="*60)
print("PROCESSING COMPLETE")
print("="*60)
