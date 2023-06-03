using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class cyclefix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogs_Users_OwnerId",
                table: "Dogs");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Dogs",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Dogs_OwnerId",
                table: "Dogs",
                newName: "IX_Dogs_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dogs_Users_UserId",
                table: "Dogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogs_Users_UserId",
                table: "Dogs");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Dogs",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Dogs_UserId",
                table: "Dogs",
                newName: "IX_Dogs_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dogs_Users_OwnerId",
                table: "Dogs",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
