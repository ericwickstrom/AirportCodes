using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirportCodes.API.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueCityNameConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Cities_Name",
                table: "Cities",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Cities_Name",
                table: "Cities");
        }
    }
}
