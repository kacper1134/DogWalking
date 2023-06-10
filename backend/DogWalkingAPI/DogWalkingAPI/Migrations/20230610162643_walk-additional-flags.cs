using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class walkadditionalflags : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAwaitingPayment",
                table: "Walks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDone",
                table: "Walks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsStarted",
                table: "Walks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAwaitingPayment",
                table: "Walks");

            migrationBuilder.DropColumn(
                name: "IsDone",
                table: "Walks");

            migrationBuilder.DropColumn(
                name: "IsStarted",
                table: "Walks");
        }
    }
}
