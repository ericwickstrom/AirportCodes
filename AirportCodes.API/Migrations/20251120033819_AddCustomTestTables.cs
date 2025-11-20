using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirportCodes.API.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomTestTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomTests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CreatedByUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    IsAnonymous = table.Column<bool>(type: "boolean", nullable: false),
                    TimerEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    TimerDurationSeconds = table.Column<int>(type: "integer", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomTests_AspNetUsers_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CustomTestAirports",
                columns: table => new
                {
                    CustomTestId = table.Column<Guid>(type: "uuid", nullable: false),
                    AirportId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomTestAirports", x => new { x.CustomTestId, x.AirportId });
                    table.ForeignKey(
                        name: "FK_CustomTestAirports_Airports_AirportId",
                        column: x => x.AirportId,
                        principalTable: "Airports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomTestAirports_CustomTests_CustomTestId",
                        column: x => x.CustomTestId,
                        principalTable: "CustomTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomTestAirports_AirportId",
                table: "CustomTestAirports",
                column: "AirportId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomTests_CreatedByUserId",
                table: "CustomTests",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomTests_IsDeleted",
                table: "CustomTests",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_CustomTests_IsPublic",
                table: "CustomTests",
                column: "IsPublic");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomTestAirports");

            migrationBuilder.DropTable(
                name: "CustomTests");
        }
    }
}
