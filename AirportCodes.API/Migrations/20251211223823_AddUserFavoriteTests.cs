using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirportCodes.API.Migrations
{
    /// <inheritdoc />
    public partial class AddUserFavoriteTests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserFavoriteTests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CustomTestId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFavoriteTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserFavoriteTests_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFavoriteTests_CustomTests_CustomTestId",
                        column: x => x.CustomTestId,
                        principalTable: "CustomTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFavoriteTests_CustomTestId",
                table: "UserFavoriteTests",
                column: "CustomTestId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavoriteTests_UserId",
                table: "UserFavoriteTests",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavoriteTests_UserId_CustomTestId",
                table: "UserFavoriteTests",
                columns: new[] { "UserId", "CustomTestId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFavoriteTests");
        }
    }
}
