using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class walkposition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Walks",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Walks",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Walks");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Walks");
        }
    }
}
