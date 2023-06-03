using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class availabilityfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availabilities_Users_WalkerId",
                table: "Availabilities");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Availabilities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Availabilities_UserId",
                table: "Availabilities",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Availabilities_Users_UserId",
                table: "Availabilities",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availabilities_Users_UserId",
                table: "Availabilities");

            migrationBuilder.DropIndex(
                name: "IX_Availabilities_UserId",
                table: "Availabilities");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Availabilities");

            migrationBuilder.AddForeignKey(
                name: "FK_Availabilities_Users_WalkerId",
                table: "Availabilities",
                column: "WalkerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
