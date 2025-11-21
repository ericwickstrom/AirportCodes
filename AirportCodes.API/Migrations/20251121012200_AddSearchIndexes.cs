using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirportCodes.API.Migrations
{
    /// <inheritdoc />
    public partial class AddSearchIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Airports_AirportName",
                table: "Airports",
                column: "AirportName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Airports_AirportName",
                table: "Airports");
        }
    }
}
