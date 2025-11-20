-- Seed data for Countries table
-- Generated from airport_data.csv
-- Total countries: 57
-- Country codes: ISO 3166-1 alpha-2

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('c9c586e6-057c-5a7b-b406-68b5ce7359fc', 'Antigua and Barbuda', 'AG')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('65ffa3d7-464b-5f43-7160-0db15a8415c4', 'Argentina', 'AR')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('05b8a054-7d39-5f9c-4851-7d7f3a5f8bd4', 'Aruba', 'AW')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('2fc7e7e7-47b5-5402-c807-397b1ba94739', 'Australia', 'AU')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('10b7320c-226b-55f6-d648-663d73daf541', 'Bahamas', 'BS')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('e7d01a87-dc00-5df4-6f21-5c534db6a5ca', 'Belgium', 'BE')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('c1502b86-d666-50ff-350e-765eca8fa98e', 'Belize', 'BZ')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('a677a789-5eef-5815-43ba-c2e5c1afb5c0', 'Bermuda', 'BM')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('ef1409c3-5cfe-5815-5e52-4af47aeb56ea', 'Brazil', 'BR')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('45d7923c-ce4a-5c85-8eb6-dc99a4c5cece', 'Canada', 'CA')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('26de2705-90bd-5172-4973-eb84a3ed30b2', 'Cayman Islands', 'KY')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('7a8e0ef9-ce56-5c30-c345-fc2c2a3ef872', 'Chile', 'CL')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('ebfd1dc7-ba32-558c-2eef-05a48cc60226', 'China', 'CN')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('d26c7c60-4048-5d5a-d138-7d13db365921', 'Colombia', 'CO')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('3d0c8987-6aae-5b0a-96d0-1730ff5e6bae', 'Costa Rica', 'CR')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('79112d73-b309-5612-af57-287f6d876f9b', 'Czech Republic', 'CZ')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('0263d62e-ed12-57e3-bf5b-6ddb376b91b0', 'Denmark', 'DK')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('2df762e6-40ab-53bc-a3d2-1076b6ea5503', 'Egypt', 'EG')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('d8c61e48-fdc4-5eb9-197d-6f21ea316879', 'France', 'FR')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('14fff8fd-ab0c-5776-a2c3-13550ee2c345', 'Germany', 'DE')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('5a82bcbd-1fa2-5226-4e1c-baacd1fd9451', 'Greece', 'GR')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('7a595266-8239-5657-60a9-3f3fbcd0cd64', 'Guam', 'GU')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('d71eff32-30ab-5a17-f278-f073390faaa3', 'Guatemala', 'GT')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('2e1c1db3-e647-5a4e-f8d9-abbceda97ffb', 'Hong Kong', 'HK')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('af895d87-7bf8-5636-e95c-be8696bc4cc8', 'Hungary', 'HU')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('7d41bc40-768e-599a-c5b8-ba4b36730a3b', 'India', 'IN')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('48aee7fc-cbab-5e6d-1a46-52bfdb2e2164', 'Ireland', 'IE')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('d58dceec-4ae4-59ad-25c7-b7934b10c7e0', 'Israel', 'IL')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('b4c79dc1-e0d1-5d97-fb41-bb847d4e46d1', 'Italy', 'IT')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('7e1fa043-f224-5605-1487-cd7e211fcfae', 'Jamaica', 'JM')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('ead00489-c03e-56f0-a05b-2b17fd68a588', 'Japan', 'JP')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('30708e4a-173d-553e-fc7c-63f91d691558', 'Jordan', 'JO')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('2ec9b39d-03df-53b2-1123-26f322904879', 'Kuwait', 'KW')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('c088b98b-1efe-50f3-659d-3619dd7b7433', 'Mexico', 'MX')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('1d7ca4eb-7221-5599-311d-c83d1c7a3882', 'Netherlands', 'NL')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('ea9038cc-82e2-54a2-3e69-60f4faac3017', 'Nigeria', 'NG')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('17456f72-b9eb-5662-e2ad-fa2690d5740a', 'Northern Mariana Islands', 'MP')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('7f319ba4-3ffe-5cf4-e9c3-108d26788e29', 'Panama', 'PA')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('57b65867-65b8-50ab-42b9-af2db63665ae', 'Peru', 'PE')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('14389eca-3bfa-576a-5c36-3d3fdf57aded', 'Philippines', 'PH')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('9091f8f0-9859-5128-27cf-40f346b3d794', 'Puerto Rico', 'PR')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('fb73ee3a-0501-511f-b774-49bccc53fc1d', 'Russia', 'RU')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('e35632b2-74af-5f16-8368-5ab266496f9e', 'Saint Lucia', 'LC')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('2fa15075-4ca4-599e-ea85-1b9f45d8be30', 'Senegal', 'SN')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('4904c630-ed91-581b-0ec2-4de5b0c26e5c', 'Singapore', 'SG')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('48851288-84b3-57a4-0353-95f37361b411', 'South Africa', 'ZA')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('8bc4fe19-5414-5122-2033-bbc3ea609411', 'Spain', 'ES')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('012c14e3-6a86-5b56-3b98-d873ea7aab3b', 'Switzerland', 'CH')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('1b52aa7f-a97e-5d51-06bb-1777c687c92e', 'Taiwan', 'TW')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('1b46d727-d2b9-5fd4-5488-56bbac21923b', 'Thailand', 'TH')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('73b67902-124c-59e3-f898-819024729775', 'Turkey', 'TR')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('a844cf8f-4eed-557f-7bab-94af058afd34', 'United Arab Emirates', 'AE')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('840acba4-683a-516a-ef13-46ab71f3f5eb', 'United Kingdom', 'GB')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('376d316a-40d0-5764-32b5-bcfd076147eb', 'United States', 'US')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('459df448-3898-5d2e-d3ae-fa00df336da0', 'Venezuela', 'VE')
ON CONFLICT ("Name") DO NOTHING;

INSERT INTO "Countries" ("Id", "Name", "CountryCode")
VALUES ('5ce2aa78-04d5-5af1-2772-e083ba7cb6f0', 'Virgin Islands', 'VI')
ON CONFLICT ("Name") DO NOTHING;

