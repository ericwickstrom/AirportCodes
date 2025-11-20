-- Seed data for Airports table
-- Generated from airport_data.json
-- Total airports: 211

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('9c821006-8b70-4ebd-810c-8ef481094a81', 'ABQ', 'Albuquerque International Sunport', 'e88d0904-5b17-43b9-9b9e-2da1c839edce')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('4226eea7-1615-4f48-b2b1-b5ecec8ce368', 'ACA', 'General Juan N Alvarez International Airport', '7d244858-d1e8-4fe4-81c5-cdf8df69b0cf')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('43f0fce5-a216-459e-98ea-982024bc70f9', 'AGS', 'Augusta Regional At Bush Field', '4c1dcb6f-7c51-4a65-a4b5-6e52ab661f76')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('add910ed-9c85-48b1-99ce-a90544bd95ca', 'ALB', 'Albany International Airport', '3405b22f-a6dc-461e-aa47-066c12b50a66')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1d25f82e-1984-4396-8f50-faf9799545af', 'AMM', 'Queen Alia International Airport', '47592b86-399a-4481-8e8c-bd16bbb2959f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1b00cd8b-6143-4bf6-8c72-7bf053a8bdce', 'AMS', 'Amsterdam Airport Schiphol', 'd60090e8-d112-49da-83f5-e768ca3cb76f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('12fce506-b5da-4f22-b562-3a7919a53ce3', 'ANC', 'Ted Stevens Anchorage International Airport', '6b0b5085-04f2-41d5-99f6-b2fda1cbd0fa')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('0c11079d-80c8-424e-b036-d42e59ebecf0', 'ANU', 'V.C. Bird International Airport', 'e52611f3-0e6e-4ba8-bab9-61f12192a8e9')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('a8946c38-aa86-4401-bd9b-a3d2e6313e05', 'ATH', 'Eleftherios Venizelos International Airport', '4e617da5-9da5-4fb8-844e-b2532211945d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('40d27d7c-1f41-45ea-b58c-e7368537d1b6', 'ATL', 'Hartsfield Jackson Atlanta International Airport', '6fbb705d-8e80-4dd1-bade-5a6cdfb67e3f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b6daff2d-0f7e-4e43-bcf2-9ba7fb21a028', 'AUA', 'Queen Beatrix International Airport', '0e6dc55a-0ad2-414c-8b95-c62188ac646f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('8609ec5b-922e-447c-9a13-0149c578c2d1', 'AUS', 'Austin Bergstrom International Airport', '801258fb-25f0-4633-b3b0-13e01ecbc249')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('570b6034-308e-4c00-9e07-84024df2d15f', 'BCN', 'Barcelona International Airport', '05fb44a3-9fa1-48b2-ae4f-bf6cb580e522')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('f3c67279-a9ee-41dd-b61a-5fcc37153a72', 'BDA', 'L.F. Wade International International Airport', '6e0caedb-dc57-4486-9529-80b602819e4b')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('69cafb31-5457-47d1-a131-6fdb4751a00e', 'BDL', 'Bradley International Airport', '7442e1c0-f5f6-4053-b2d2-cbbbb34ad260')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('2e42443e-2e78-409e-b263-8440f264583f', 'BER', 'Berlin Brandenburg Airport', 'cc17a535-0ed8-45f4-9271-ce2282a7c9c6')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ecb6349e-358e-470b-88e0-7e185c60dc68', 'BHM', 'Birmingham-Shuttlesworth International Airport', 'd87c8141-b461-4174-bc18-85d5cd4d6be9')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('cfe4d9c9-605b-442d-baba-3be24ab0e25e', 'BIL', 'Billings Logan International Airport', 'aea5fd54-5de2-40b8-ab26-0ab2b1a782ca')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b6953e4a-e2fd-4aed-865d-fd47b9b2a293', 'BIS', 'Bismarck Municipal Airport', 'fe6d58d3-9d0a-4707-aba5-ddb52eac95c4')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e4db0c96-5b30-43a8-b74e-f328a834e308', 'BKK', 'Suvarnabhumi Airport', 'f1ef2b9c-91c9-4be7-9e60-7db876c24a32')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('a5ab4d0a-4de6-4c66-90f9-104b702d0998', 'BNA', 'Nashville International Airport', 'efde4bb1-792a-4e4a-a027-dcc4aac0d324')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('9ef0945e-fac4-4e7e-a89e-68f5f9da6691', 'BOG', 'El Dorado International Airport', 'f0d439d6-541a-43a4-b273-01a130cb61da')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('cc521e9f-5445-432b-821f-5e2156df7812', 'BOI', 'Boise Air Terminal/Gowen Field', '816b526e-2f7d-4668-9b60-d40a94f480e4')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('77b0a38d-33b8-4358-a482-7cdf961a2886', 'BOM', 'Chhatrapati Shivaji International Airport', '5cbcbc53-981a-4bb0-9e1d-1ca117beb2c5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('55f621f7-bd52-40c0-8964-a383df241726', 'BOS', 'General Edward Lawrence Logan International Airport', '01c967d4-0277-434c-9474-e6d581535e06')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('54efc819-2136-4f99-bf27-465fcb94b970', 'BRU', 'Brussels Airport', '801df1b4-6915-4876-b0ce-cf329a8e6e08')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('69a988e6-65e6-4e04-9e1f-4a3bbbf83dd3', 'BTM', 'Bert Mooney Airport', '08b359d5-b573-494f-995f-56cbea9edece')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('d51a8c0c-d083-49f1-8eb3-c293baf0cb95', 'BUD', 'Budapest Liszt Ferenc International Airport', 'a347e662-d30d-4e0c-8199-f9299da53a48')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e3663aa6-ba79-4a64-88db-4ff0a31879db', 'BUF', 'Buffalo Niagara International Airport', 'adf0a3cc-3d7a-4e63-a05a-ffe3958357a2')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c8270878-efd0-448f-bce1-66c3649e198d', 'BUR', 'Bob Hope Airport', 'f67c7dc0-cf9c-45f3-ad9f-f575f04ded4d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ce94bdb4-34d5-4555-948e-5303e51e400e', 'BWI', 'Baltimore/Washington International Thurgood Marshall Airport', '84d0b3e8-bc63-48ca-8bf8-537f57617881')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e189efc1-3ae3-4b48-a559-70a884f265fd', 'BZE', 'Philip S. W. Goldson International Airport', '62503b09-e258-485a-932d-cf1368f64699')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5008acb1-4a87-436f-99c4-cc4e7d0ca4a4', 'BZN', 'Gallatin Field', 'c4af0edf-9dff-4320-93a6-be69ff5016b0')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('01a8b0a6-e7ae-4cf6-926a-c39f9d487427', 'CAE', 'Columbia Metropolitan Airport', '56640f0d-dd14-4e6c-a4a8-40021117dd71')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b563f054-4f48-437e-a6dc-66bde7b5eb50', 'CAI', 'Cairo International Airport', '7fc76dca-1b7a-4f4c-9d0d-41b167a80754')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('9017ce18-4fa8-471a-975c-e85c41e3e6e6', 'CCS', 'Simón Bolívar International Airport', 'c472f2e1-307d-4416-a330-bea81861aa9a')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ffb911f0-3628-46ca-b068-7f0fb58ab57c', 'CDC', 'Cedar City Regional Airport', '6915d992-3687-43e9-b065-85cd754974d1')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e8eb2e41-bebf-4526-8bd7-72f2bfd2a437', 'CDG', 'Charles de Gaulle International Airport', '67daccb2-2980-4e9d-9f23-c41829adc3f9')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c365ab45-c34e-4eff-b05c-0fa4da5733b5', 'CHA', 'Lovell Field', '715aa594-40fa-4dd7-9a75-7bebef45a840')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('6f4ac61a-2938-4999-95bd-0c778ba7b382', 'CHS', 'Charleston Air Force Base-International Airport', '05b61828-9a24-4274-803b-eb2ce19aea95')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('8fde957a-d575-4f3f-8694-b6efa25bfd5b', 'CLE', 'Cleveland Hopkins International Airport', 'f473b41c-c7a4-47f0-a673-37ff56e071e4')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('02fdeea3-6997-4aa5-981a-9017247f4ddd', 'CLT', 'Charlotte Douglas International Airport', '53485de6-dad8-4a43-b716-4046022e34c9')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('93242fe3-77a6-487f-b1bc-d8e53b7bd2eb', 'CMH', 'John Glenn Columbus International Airport', 'c9b4d703-4cc6-4448-90ed-98bd87d395ab')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5d54dd49-edf8-482c-9f64-9df5aa83b84b', 'COS', 'City of Colorado Springs Municipal Airport', 'c9b85ca5-2548-4461-88e2-cc95d796ae25')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('721311bc-fb27-48d9-8a8f-32b5ac06f003', 'CPH', 'Copenhagen Kastrup Airport', '38735018-8ad7-4524-afa4-1f4a259cf058')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1f406d25-63ab-472f-9160-e160cf2ff432', 'CPR', 'Casper-Natrona County International Airport', 'aed9d19e-53f7-41ab-94aa-e5ef77a5851e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('392dd2b9-9df7-4684-8f70-5d66d881d4cd', 'CUN', 'Cancún International Airport', '15afe865-d5af-4e2f-8ef2-d989b4555aeb')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('9d2371eb-0c0d-4000-8742-39c25643e6a5', 'CVG', 'Cincinnati Northern Kentucky International Airport', 'a6b54356-4810-44d4-8ff3-39f0bdc7685b')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('6fb64215-1962-4820-983a-8ce6ab8e4f30', 'CZM', 'Cozumel International Airport', '00b1bfde-8a07-4760-b4c8-786ecad03a94')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('938f6f72-7b0f-48fb-aa5a-6f490a920747', 'DAB', 'Daytona Beach International Airport', '89da52ed-e16e-4b41-80e9-fdee6b07e42a')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('82adff2d-8339-4d85-9bc3-baec412cab87', 'DAL', 'Dallas Love Field', '25623ffb-9e63-499f-b1ea-41a38663a466')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('d90e544d-2d9c-44b1-a375-f36ffe3cfa68', 'DAY', 'James M Cox Dayton International Airport', 'de30b61c-f1a3-4ccd-810f-b12b00f04314')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('3865cd8f-b5ef-4423-9f36-5292d7faa647', 'DCA', 'Ronald Reagan Washington National Airport', 'bcd31bce-c218-4612-81f5-5ad68be56267')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('f2c63c6b-c91e-4564-9152-5025126c34e9', 'DEN', 'Denver International Airport', '4c18d4c0-0445-4d44-935f-56749d4aec28')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('865551df-52b1-4b0f-805c-db3cc264e9c4', 'DFW', 'Dallas Fort Worth International Airport', '2c6da82d-137e-4549-b0d6-835e9354589d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('116e4348-c494-450c-8eee-ca9e45dc804d', 'DLH', 'Duluth International Airport', 'e61d1978-24ef-4f71-b9ad-f50c3bbcdc23')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('cb027722-764d-4b3f-8270-62ca0a0d1773', 'DSM', 'Des Moines International Airport', '6ed1537b-7309-4401-8c06-197e77389cd7')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('9e2afc1a-f7a6-4b42-8eda-960de7bcd2f9', 'DSS', 'Blaise Diagne International Airport', '1e598ce0-bde0-4ba1-80fa-3e11cb49d90f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('40722dbf-8017-4242-af89-7b4b1adf2ffe', 'DTW', 'Detroit Metropolitan Wayne County Airport', 'f04da0e1-4f05-4a8d-9342-f0a2b4bf1c50')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('fb3275ea-7083-4178-84ae-2b38ca8c5901', 'DUB', 'Dublin Airport', '906b18a9-89be-4aef-9174-90be11b831f9')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('8e7eb288-a8d1-4d80-8c88-7af2e6cbd5cf', 'DUS', 'Düsseldorf Airport', '27989cce-76f3-4e54-b79e-3f5fdef1d48f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('29b1d90a-dfa1-4f8f-a6f6-de3863e6ed23', 'DXB', 'Dubai International Airport', '3fc52429-e67d-4930-b7b7-5a12d0b5d10f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('39620f16-56e7-453e-87f4-36e8791bb0b1', 'EGE', 'Eagle County Regional Airport', 'd5714958-8855-44fe-b2f5-a7034a07db3a')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ca9bc852-203d-49f4-a773-ba778a31832b', 'ELP', 'El Paso International Airport', '2c58d654-4397-4417-8254-6ba0d3a214f9')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('674e6fcb-479f-452e-af8b-2fada132f277', 'EWR', 'Newark Liberty International Airport', '9a3fe08a-61c5-4c1b-b9e7-1aee610551f5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1a5e1598-9866-4669-9674-39c496e25ddd', 'EYW', 'Key West International Airport', '20a2bbb2-6cba-4faf-8c91-63c5ade69424')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('9e9cf450-dcb3-4bd2-ac73-7bee3f70f7bb', 'EZE', 'Ministro Pistarini International Airport', '60ee70e6-e033-4427-b26c-a1b0ba125100')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('49899bf3-49af-4c07-b670-a409e60cf162', 'FAI', 'Fairbanks International Airport', '8eb691e4-1462-4039-98f8-89ae4b692fb4')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('81bc24a0-64e5-4dd1-a7d3-61e1051bfb6e', 'FAR', 'Hector International Airport', '3f79438e-189f-4fdc-8ebe-4e2044c1c309')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c72a7beb-fbe3-4bfb-93c3-43aa5b67b1cf', 'FAT', 'Fresno Yosemite International Airport', 'b77754b1-f15c-4966-a84d-83657cc9bc05')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('3dc54d35-7f51-4a15-88f1-973483b4bb3e', 'FCA', 'Glacier Park International Airport', '8325cf42-763d-4a28-8855-b84bcc6c3c0c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('4d48d936-35be-49b5-85c3-3c173e62b5bb', 'FCO', 'Leonardo da Vinci–Fiumicino Airport', 'e1029d27-4bd2-4b4b-ba1f-2a60b4d17586')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('bb342d47-eda0-4b11-b5a6-cfed3d361d4d', 'FLL', 'Fort Lauderdale Hollywood International Airport', 'f33965d5-0aef-4bd2-b850-ade53a6f5b99')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('69d3d7f3-28a1-4629-9891-e7c25d151818', 'FNT', 'Bishop International Airport', 'cda757ec-bb86-4138-a917-3ea0979e2fe5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('18c81fc8-08e0-40ef-b8af-0c7480e683b0', 'FRA', 'Frankfurt am Main Airport', '9a56a1c4-1a26-4bd9-af68-c7f52aa718b0')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('21f597d5-9cb3-49a5-9405-a64ee86e5cfc', 'FSD', 'Joe Foss Field Airport', 'a1ce1d63-f646-4c0c-b398-57aeb270faf7')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('8a218239-510b-4d7e-a9a3-ab4ba654d371', 'GCM', 'Owen Roberts International Airport', 'aa1e6c89-234c-4ec0-bd40-584a032aeb36')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('2b940b26-0433-4af4-bd1c-f7f9c7e84150', 'GDL', 'Don Miguel Hidalgo Y Costilla International Airport', 'ce1fad8d-f6be-428d-9a5a-c54f1d3c8cb3')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1bb16e5b-20b7-4739-a45c-0d1a9928b1f4', 'GEG', 'Spokane International Airport', '4c65573b-f798-4118-b6c1-8421cb700d90')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c77e3813-f671-407b-9c97-6b0f3142378d', 'GIG', 'Rio Galeão – Tom Jobim International Airport', '5bc79634-03fa-4c50-941d-161dcfe54ea4')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7d7fda8b-d03a-4625-ad4e-3e4aa81c730b', 'GPT', 'Gulfport Biloxi International Airport', '06d7706b-4945-4052-b446-511287eaef84')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b71087fd-a7cb-4d04-8182-4e24cf3755be', 'GRB', 'Austin Straubel International Airport', '7283f5d2-53aa-4fe5-9d8b-b5725a2370fa')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e0015add-6da9-4506-9546-befee37f427e', 'GRR', 'Gerald R. Ford International Airport', 'b83aa00c-abf8-41e7-a95f-b846b54066cf')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('f633f7b7-fcc6-47a5-8630-05ec3738f251', 'GRU', 'Guarulhos - Governador André Franco Montoro International Airport', 'a04b479b-c1f0-42b4-9acb-b7a64855a820')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('4dfeeda6-e3d6-4ec2-ac97-2195623553cf', 'GSP', 'Greenville Spartanburg International Airport', 'ba7b0a6f-5571-42ef-bdca-6dbc46ec2d8e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('bf532b18-2dac-438a-8827-5d26dda5834f', 'GTF', 'Great Falls International Airport', 'c65ad12f-2c16-4461-9336-0e304facf946')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('17d93c82-d7ce-4e94-8f87-a2b7f53ca7bb', 'GUA', 'La Aurora Airport', 'eb767ae3-a3be-436c-814e-123c41b81774')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('eae79b39-8682-4dc2-bec4-be3397ac2312', 'GUC', 'Gunnison Crested Butte Regional Airport', '6422c483-ed33-4f76-9f53-e84e3502b299')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('635a2225-aac4-49fd-b087-28d149085c0f', 'GUM', 'Antonio B. Won Pat International Airport', 'ebddf332-75f9-4ba6-8d4a-d0db85f886b1')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e49210fe-1104-4ec2-9311-a13b5cdc7ca6', 'HDN', 'Yampa Valley Airport', '6e2091ff-06e7-4c4c-bcd9-a889cc529014')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('0d6e2260-b3f7-4c62-8aaa-6dabb716f754', 'HKG', 'Hong Kong International Airport', 'c09ed033-20f1-4207-a887-b94c509440d5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('59ef729b-695c-4904-88d7-c9d6798bc51b', 'HLN', 'Helena Regional Airport', '07ad1b38-b72e-4340-9582-cf52594a0a70')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('597ff5a3-cbe9-47c7-8b45-a8d0842f7ceb', 'HNL', 'Daniel K Inouye International Airport', 'f0772684-3637-41af-bfc8-f502cae422a1')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7e001516-66f9-4c68-bc1c-e2de3678014d', 'HOU', 'William P Hobby Airport', 'cb784571-4159-433f-8ac0-8cd0ecd2ee31')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e517d66a-d2b7-4450-b203-4b4f8e0dbe0f', 'HSV', 'Huntsville International Carl T Jones Field', 'ca6358f9-f41c-457e-8485-44dc1e1307e0')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('a22534ef-e091-4294-8ece-8a5a0fda97f3', 'IAD', 'Washington Dulles International Airport', 'bcd31bce-c218-4612-81f5-5ad68be56267')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7b694885-fdda-416d-80e2-7fad6d46cc00', 'IAH', 'George Bush Intercontinental Houston Airport', 'cb784571-4159-433f-8ac0-8cd0ecd2ee31')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5579014d-a7d7-4b29-8cba-fa6fb3a975d6', 'IDA', 'Idaho Falls Regional Airport', '33b0c628-345a-4e5a-9821-bba108763597')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1fc98697-a71b-42d5-961a-c85eea6988d1', 'IND', 'Indianapolis International Airport', '90f17fd6-9db1-4ccf-8439-9eb385961a62')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('0fdf03c9-bcb0-465e-a555-bafc1f809322', 'IST', 'Istanbul Airport', '8bbe9c75-c5de-4890-b352-004a90966fad')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('8493f884-a2c8-4b83-b464-6ba82114a7e6', 'JAC', 'Jackson Hole Airport', '92630c71-1ecb-4db1-a45c-9742e374ea56')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ffc4ca49-41a3-485e-891e-27d900186cb4', 'JAN', 'Jackson-Medgar Wiley Evers International Airport', '35b30c47-3aed-4290-aeb0-124dc4403fda')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7895cf4f-c981-4d1c-ab15-eb7153438e84', 'JAX', 'Jacksonville International Airport', '95477969-3161-46e8-89e6-83c33fa3d48b')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('3c560bfa-527e-4db0-ab96-19deadc23adb', 'JFK', 'John F Kennedy International Airport', '8fdc3b26-a960-4039-95be-c9853baf016c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('f0c0364b-bd3d-4c42-906e-398246ef7462', 'JNB', 'OR Tambo International Airport', '8c2868cb-c0ae-48ca-bbe0-966063092fbf')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1912e0c6-d037-4220-9c21-1afa89d7f427', 'KIX', 'Kansai International Airport', 'f016cfe6-e74c-48de-9fd0-50b3bdd502b1')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('2358c6fc-45a1-4fa7-bfea-eee192daaf99', 'KOA', 'Ellison Onizuka Kona International At Keahole Airport', 'c97acda6-5bf7-410a-ad7d-6e0d282f8ddf')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('fd73a0e8-0c8f-4907-b7c2-4136cc21d38a', 'KWI', 'Kuwait International Airport', '087770e6-5320-4b09-bedd-3d00e69d2993')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('a86aeb60-e033-4ff9-88f1-ef73bd50593b', 'LAS', 'McCarran International Airport', '00e12a1d-d656-4cb7-9fd7-e95f81d05602')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b4566537-6074-4a99-9576-683b9848288a', 'LAX', 'Los Angeles International Airport', '19796218-a4dd-4cad-9c02-0ff527f8f762')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ed78e23a-7f78-498b-9557-63ab21bc8c6d', 'LEX', 'Blue Grass Airport', '966d9ba8-219f-4736-88d7-b632b4a8f343')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('d2211e7a-dd89-47ad-87da-022b630d1ee4', 'LGA', 'La Guardia Airport', '8fdc3b26-a960-4039-95be-c9853baf016c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1e6a5269-0eba-4656-8a3f-3b1e6dcd8980', 'LGB', 'Long Beach /Daugherty Field/ Airport', '8f03d81b-25bf-42e3-aba3-73167455ce6e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e99de6ae-61df-4bd3-8d81-7a208849ce9f', 'LGW', 'London Gatwick Airport', '329a3b01-d2b3-4632-91f9-79531d0cf215')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('fd05d73f-79b9-494a-92cc-ea183dc360a0', 'LHR', 'London Heathrow Airport', '329a3b01-d2b3-4632-91f9-79531d0cf215')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('a4ac1476-dc35-427a-93c8-a61ffdb6c906', 'LIH', 'Lihue Airport', '1c5da413-309a-4647-bd53-636210ad125e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e4f772b3-53a9-451a-b07f-651d37ea9e49', 'LIM', 'Jorge Chávez International Airport', 'd488cdfd-928f-4c97-a294-cecd62818615')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('506f1eca-bfd5-4ac0-bb94-cf2f0bdc3d39', 'LIR', 'Daniel Oduber Quiros International Airport', '813b5c16-7cde-415e-a926-049621fc82e0')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b595efd8-889a-4627-a45b-62b0e3eb9fbd', 'LIT', 'Bill & Hillary Clinton National Airport/Adams Field', '72abdcb1-843d-490c-8fe5-b757bb7ce3a7')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('d26973a6-5805-44ac-8af7-a4a384cf2cd9', 'LOS', 'Murtala Muhammed International Airport', '61624cf6-3fc1-40ff-9cf0-3cf4a1c779e4')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5d0bd511-d04b-49f2-8cf2-7c071b9542aa', 'MAD', 'Adolfo Suárez Madrid–Barajas Airport', 'e549119c-87f0-4b06-95d3-1097b27f1b27')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('6ec4b0c7-4539-4082-af54-c5e42228ed8e', 'MAN', 'Manchester Airport', '7c93cd94-7470-4f24-8dcf-2b634ca153a0')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c80d0df6-463f-4ee3-b4cd-2f507298208b', 'MBJ', 'Sangster International Airport', '8aae1120-7734-413d-8761-81093cf7b555')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ec474a3f-86bb-4b8c-8adc-75a2773a6a3a', 'MCI', 'Kansas City International Airport', '190c54dc-2b74-403e-afa8-727d7099b907')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ee1d5139-7806-49bb-bd0c-7219db704d8b', 'MCO', 'Orlando International Airport', '5000b8bf-7043-49d4-a1c0-c0ffae362e16')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7ef6d28d-6283-4c9b-8601-17a09f6012d6', 'MDW', 'Chicago Midway International Airport', '639ec835-9155-41a2-b529-e2338d005b53')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e393c4fd-7a9e-4422-8587-046792560013', 'MEM', 'Memphis International Airport', '513934d4-a8d5-4b9d-8f06-ab2d81732723')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('08d5d277-e66b-4852-9273-6fc2fc9a2106', 'MEX', 'Licenciado Benito Juarez International Airport', '8b63f84d-71be-4ccf-a00d-77d34da1c090')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('457ed5f2-607e-4519-a3ee-d1bdbb234357', 'MFR', 'Rogue Valley International Medford Airport', '048fed17-fe1c-4a29-b1a2-a3a22577f374')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('db83dc3a-6c3d-4e67-8cea-ebc03994a9f6', 'MHT', 'Manchester-Boston Regional Airport', '659f9232-21ae-41b1-bf21-249fcc856bef')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('2bc7c1e4-1b21-44c4-b102-e63fc2894a1c', 'MIA', 'Miami International Airport', '198058d4-2909-4e6e-ab05-9d9c395ee254')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('595e622c-c494-40fc-b32b-0e364a2921b8', 'MKE', 'General Mitchell International Airport', '7f0211ef-de46-48db-b4a4-eb1c34fa82ff')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('be916fe7-4dec-457a-adba-ac302ef37906', 'MLB', 'Melbourne International Airport', '27cc5c20-2a4f-4436-82f8-9db1e1414993')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('8fdd35ec-c893-464f-a476-250b64795089', 'MNL', 'Ninoy Aquino International Airport', 'cdd81a59-fa30-4172-b2a4-20bb7e6d5c72')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('72a462f9-b007-441c-9a68-4124fe6141bf', 'MSN', 'Dane County Regional Truax Field', '60ee818b-06e6-4ed4-9afe-7b01737c06fe')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('05371804-b059-4572-ab96-f6ae72e96c51', 'MSO', 'Missoula International Airport', '15e6a5df-b4dd-487f-a47e-cee0d73b2290')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('f210bf85-935d-4dc3-afa1-69362644d1a0', 'MSP', 'Minneapolis-St Paul International/Wold-Chamberlain Airport', 'd8e250c7-e6b4-4970-88fc-1857b45649f7')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('aef447f2-1693-469c-8ea5-f9683310daad', 'MSY', 'Louis Armstrong New Orleans International Airport', '945be8b3-767e-439f-bcf4-ed5fd25c38dd')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('34a28333-12ff-43c5-834d-9d01d8f1392b', 'MTJ', 'Montrose Regional Airport', 'ff715007-6419-4094-ac3b-70718185a9dc')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('534902b6-13c1-47f2-a591-f7888a767246', 'MUC', 'Munich Airport', 'fb170691-b700-45bf-8588-284bcc3c714d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1c0dd171-ac8c-4fae-a7b2-7f4e2573a8ea', 'MXP', 'Malpensa International Airport', '6a03fe45-aa98-4326-a85a-eca27d22aa48')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('170d5424-1a19-44c4-b627-7579f927b8ed', 'MYR', 'Myrtle Beach International Airport', '86a95f19-773c-4f48-a0b6-adf8fe141416')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1a903ceb-db37-4544-ab9e-1b8af6bb5845', 'MZT', 'General Rafael Buelna International Airport', 'e58ccaf5-0c50-4ef3-a698-8fb39ba16130')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('3f5f7479-28f0-4a20-8b6d-f38cce3b7d51', 'NAS', 'Lynden Pindling International Airport', '53af1c58-ab5c-4563-883f-c620644999c5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('fd2e41eb-d94e-4b45-a7ec-69c4692793df', 'NCE', 'Nice-Côte d''Azur Airport', '769a4cff-6d19-4f6b-a68f-fa6971e208ca')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c7abfc12-7561-469c-bf55-2e069e5f0408', 'NGO', 'Chubu Centrair International Airport', 'e934c58d-9d1f-4f2b-b2dd-6b6166c82cdd')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b6426fdb-2fe8-4322-9a8b-48d734532b14', 'NRT', 'Narita International Airport', '3a10e12a-6cab-4cc8-b9ed-29081846c4e5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('35a78de8-ddef-4822-8437-c8aa8aeaeea9', 'OAK', 'Metropolitan Oakland International Airport', 'f6663417-43bd-497d-a56b-4201f6272e16')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5220a3b6-f84b-4f86-9e17-eca5638151e4', 'OGG', 'Kahului Airport', '6a9924ff-3ee0-4c41-8de2-6936d8357fee')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5f544eee-cc67-4bd5-a595-6df002752350', 'OMA', 'Eppley Airfield', 'f017a4a1-70b5-469d-b90a-01e2b1daf17e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('82b90ce3-e965-4e19-956f-645b797778f9', 'ONT', 'Ontario International Airport', '51d6fd60-25dc-4fe8-af90-73786453ea11')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1ffcf194-04ee-494f-b6e2-ce5866bec9a9', 'ORD', 'Chicago O''Hare International Airport', '639ec835-9155-41a2-b529-e2338d005b53')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('af0b6c76-2815-4ae0-8046-1221ee96c962', 'ORF', 'Norfolk International Airport', '9853175f-6dbe-44f6-b562-cdb822ed985d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('4aa79e53-1d28-45d9-89c2-7d1b435778f5', 'PBI', 'Palm Beach International Airport', '6efe256f-1d50-4a76-8957-a62e2c43eaa3')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('3db1f118-d21c-48dd-82f4-d003b5d8e0e6', 'PDX', 'Portland International Airport', '15c8fe54-0ea8-4601-9481-ba200d288d2c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('3595fe7b-465d-4f1e-93f0-133283b1b371', 'PEK', 'Beijing Capital International Airport', 'a3aee785-34b5-4a4a-8ee3-40d3d6890381')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('10827d1a-f564-401d-ba11-52e15ee8cf61', 'PHL', 'Philadelphia International Airport', '812863b9-6784-40c8-a249-c90640a71f02')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('0a8a3e07-54cd-4357-ae9b-520cb314a690', 'PHX', 'Phoenix Sky Harbor International Airport', '46866b92-e581-4c0f-a965-287b8e37d374')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7432754f-64cb-4831-b4c5-f72f0c31e418', 'PIT', 'Pittsburgh International Airport', '386930c5-1faf-4561-ba90-2ccddd00f759')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('cbe6ab2b-6ae7-4cb4-96e8-1893de85e45d', 'PNS', 'Pensacola Regional Airport', 'd232dec3-232f-4d98-a477-515e23ef842a')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('19f800f5-0d4f-4185-81b8-3e989bfecd05', 'PRG', 'Václav Havel Airport Prague', '268fd71b-f3f8-42e3-9695-ff102378d17d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('384ac9a3-89ee-4056-8ab1-cd94f40a389d', 'PSC', 'Tri Cities Airport', 'a21d594d-e87a-467d-807b-de0cb6b6ed0d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('854e5dae-03f7-482e-ad2d-ab669eb5c36f', 'PSP', 'Palm Springs International Airport', 'ba253a2c-733d-4658-8bcf-71f543cabaf1')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e6770088-341f-4228-a572-da3194eff041', 'PTY', 'Tocumen International Airport', '80080469-897b-4e42-880e-96b00a0272a7')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('4455e882-bc90-4867-8c18-3a22797c4c31', 'PVD', 'Theodore Francis Green State Airport', 'a7f06c42-e37c-4f3e-bd2f-ad220d316a3d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7a6b8308-970a-4356-8964-a356accd7df0', 'PVR', 'Licenciado Gustavo Díaz Ordaz International Airport', '5d78bf48-a2ba-42ce-b667-1a2642692a5c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('286e2c31-e9e4-4347-89e8-17535e4bead9', 'RAP', 'Rapid City Regional Airport', '2a3fd734-a579-41e8-b850-f2798ee56501')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('3c75d7f5-5c2b-4235-b912-6286875ef1ee', 'RDU', 'Raleigh Durham International Airport', 'b1cc8b9a-a5a9-490d-acd6-c62c9fe5214e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('237192fe-a9a8-413f-a1a8-e9f8d5693b2d', 'RIC', 'Richmond International Airport', '29cab089-1287-41eb-88d4-5c2fd6ca3d9c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1e02b41d-8a37-4827-8e36-0ed2320a45f1', 'RNO', 'Reno Tahoe International Airport', '5c77ca35-59ef-4cc2-a168-4506f5025975')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ae2a684a-5a31-4fcf-bccf-3baa79f1e4da', 'ROC', 'Greater Rochester International Airport', 'c89d0aa3-b243-45da-9117-6620f6f9d09d')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('50e312dd-6949-4758-a207-5100322310e0', 'RSW', 'Southwest Florida International Airport', '3b7e3561-bf33-4514-bb57-a52a3bcdfb44')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('25019db7-7682-4a75-ab37-d5ed9e2e4c83', 'SAN', 'San Diego International Airport', 'a4c24ad9-785b-4187-993c-132c5dda9ae5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c96fb281-e139-4ad9-b2c0-9c9ee313ea3c', 'SAT', 'San Antonio International Airport', '820c3930-d413-4d56-8b48-e819b2215dfa')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('4db6871f-5655-43fc-8b48-43c14f8c9805', 'SAV', 'Savannah Hilton Head International Airport', '8b2eb41b-57ba-4dbe-b480-0ef4ee67b40e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('6d1315e2-1c63-4fb8-9803-eefe546c6701', 'SCL', 'Comodoro Arturo Merino Benítez International Airport', '88b3cc09-159d-43d2-a534-01e776e128b8')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('acc470a2-af80-4fa9-a517-f89ad8b793c6', 'SDF', 'Louisville International Standiford Field', '8328bf17-7da8-40e7-9196-1aa969e5fbc0')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('aea8057a-662d-478e-9210-6d519859b074', 'SEA', 'Seattle Tacoma International Airport', '8e9854a8-9cf7-414d-a38f-ef42e8b3c3f8')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5dc8bd2c-1269-4e06-a2fe-891c519ed003', 'SFO', 'San Francisco International Airport', '2be61f5d-dfbd-4612-b143-fa0312fbc30b')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('02f5dfb9-3d48-472d-9bf5-c93e28794ea9', 'SGU', 'St George Municipal Airport', '5f870f70-2d9b-4365-ab42-920d0fe63ccf')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1c6f07b5-4da5-4df5-9620-5e383da932b8', 'SIN', 'Singapore Changi Airport', 'c0fba0a9-779c-4982-9a1f-456f859e9361')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('89bfa24f-7fbd-4920-95e0-436896476750', 'SJC', 'Norman Y. Mineta San Jose International Airport', 'f37c1502-d214-4711-b52f-c0dc4ea0d2a3')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('432c1b7a-f47e-4c5c-ac13-ffcc4e6895de', 'SJD', 'Los Cabos International Airport', 'a75d568b-28b9-4413-a353-86cc0561ff6f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('d6231418-52ae-4546-a9b4-bb989dabc4c8', 'SJO', 'Juan Santamaria International Airport', 'f37c1502-d214-4711-b52f-c0dc4ea0d2a3')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('e037d741-65f5-42d1-92ea-02aff55fb5a3', 'SJU', 'Luis Munoz Marin International Airport', 'e16ef283-d52c-4a6a-8ced-dda485eab1ab')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('8691400b-172a-4830-96f8-540d094092a9', 'SLC', 'Salt Lake City International Airport', '920e647b-5387-46ec-a998-e12ae19280c5')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1ee060c6-397f-4d1f-904e-bea01f6cea3a', 'SMF', 'Sacramento International Airport', 'ae9f32f9-d2bf-4f27-80bb-72a6de23d776')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('f9d4444f-b902-42f1-88e3-3e7983a141de', 'SNA', 'John Wayne Airport-Orange County Airport', '270913c4-fbdb-4f47-80c9-84e5d56da560')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('f1d51f78-bcc2-4f1b-ad6d-3e4f73bc9f9b', 'SNN', 'Shannon Airport', '70341b45-d6bc-4388-beeb-019a2d9de609')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5aa54c66-bd5a-4488-9dc9-4e02cad09c7f', 'SPN', 'Saipan International Airport', '1c530af6-fdd8-491e-961e-b000b197b489')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('5e968da8-d21d-42e2-bdb1-b063072b744e', 'SRQ', 'Sarasota Bradenton International Airport', '6c4bf9e8-833f-40b9-a5d2-dc685999f4ae')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('1b77a378-18c4-465e-bb08-4046a97bb0f5', 'STL', 'St Louis Lambert International Airport', 'a1c43414-c357-42ac-945c-76b2bb5c8fc4')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('70388e10-21e7-462f-b7a7-17f86aab1c0a', 'STR', 'Stuttgart Airport', '2ff257f4-6bc8-4ac1-9c98-e3cdbb949840')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b27b3558-db62-45d9-a2aa-310051e54932', 'STT', 'Cyril E. King Airport', '1c63a1a1-ba65-4045-b987-17d436339e70')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b1c01024-c5ad-4a92-ae5c-fc2f9eaa0080', 'SUN', 'Friedman Memorial Airport', '23264611-5996-4f2c-b350-5840437c2ad1')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('b8a60132-81e7-4872-b25d-12e85fbbc190', 'SVO', 'Sheremetyevo International Airport', '89df082b-dbe2-4301-b0f2-fcad1b3fe38c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('2df4c7a0-9b8b-4767-aeae-c19177e66193', 'SYD', 'Sydney Kingsford Smith International Airport', '6c4a10d8-b162-4b53-908d-5acf9f7db798')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('fed9d16a-00ac-454f-a08a-3a3dbe9871d5', 'TLH', 'Tallahassee Regional Airport', '0a831c0b-d2bc-4706-b6a3-ca194fe71d37')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('ab530524-6f15-4eb6-8932-599fa2a8c417', 'TLV', 'Ben Gurion International Airport', 'd70c98c7-0881-45a2-819c-0cc1cfcc56cd')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('7ef92fb0-9190-48fc-96bb-262a3b8b1790', 'TPA', 'Tampa International Airport', 'a286adc3-4160-4f3c-b6c3-434693a7e1bf')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('56563755-fc61-4cf8-8ccf-3e61e7942e21', 'TPE', 'Taiwan Taoyuan International Airport', '714ac39e-491a-482f-8cd2-1111b6200e10')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('68500d2c-ecde-45d0-aea8-2db9e5370a3b', 'TUS', 'Tucson International Airport', 'f8f7951a-7f60-4f8a-88de-29e38fcc256e')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('c43d3fb5-ef3f-4e16-b046-e9e9f8297054', 'TYS', 'McGhee Tyson Airport', 'a3df6de4-1051-4ba6-a620-fe9b97d0f78b')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('0ec293ed-4cf3-4437-b05c-909e07409696', 'UVF', 'Hewanorra International Airport', 'dcd64ab7-9f9e-47f5-af68-2593846fbfb3')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('95838aa8-9799-4ed8-bf03-d5ff17a654ea', 'VCE', 'Venice Marco Polo Airport', '7ffdd580-e3b9-4507-a012-b73b627ef25c')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('41c674b3-83db-4412-8d1f-fcf9d737b092', 'YEG', 'Edmonton International Airport', 'cacb80c1-ac67-4946-b814-cb586107a3cf')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('6b811bbb-5f32-4225-9ce7-bc4e167f43e7', 'YUL', 'Montreal / Pierre Elliott Trudeau International Airport', '7474043e-7612-40ad-ad73-5812b78cfa35')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('98dfbb1e-46ae-4091-82c5-44b807b1ab7c', 'YVR', 'Vancouver International Airport', 'e91976bc-3f8c-418e-b5c8-9e3e70553cbe')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('768d5511-55cb-4c0b-a84f-4d1d37dd9f32', 'YWG', 'Winnipeg / James Armstrong Richardson International Airport', 'cd069e82-37ba-4db6-9930-e6ae33482e9f')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('dfa1b472-4958-4b1b-8116-09f787a07374', 'YYC', 'Calgary International Airport', '1dd027f9-8694-4b61-8013-233c43bd615b')
ON CONFLICT ("IataCode") DO NOTHING;

INSERT INTO "Airports" ("Id", "IataCode", "AirportName", "CityId")
VALUES ('207f89f0-1d62-4fdc-929e-3382d8cb2c64', 'ZRH', 'Zürich Airport', '0e03d8b0-cad9-42ae-a1fe-f5c9140acaa3')
ON CONFLICT ("IataCode") DO NOTHING;

