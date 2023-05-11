using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class ModelFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availabilities_Users_UserId",
                table: "Availabilities");

            migrationBuilder.DropForeignKey(
                name: "FK_Walks_Dogs_DogId",
                table: "Walks");

            migrationBuilder.DropForeignKey(
                name: "FK_Walks_Users_UserId",
                table: "Walks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Walks",
                table: "Walks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Availabilities",
                table: "Availabilities");

            migrationBuilder.DropColumn(
                name: "ApartmentNr",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Biography",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BuildingNr",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Dogs");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "Dogs");

            migrationBuilder.RenameColumn(
                name: "Rate",
                table: "Walks",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "DogId",
                table: "Walks",
                newName: "OwnerId");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Walks",
                newName: "EndTime");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Walks",
                newName: "WalkerId");

            migrationBuilder.RenameIndex(
                name: "IX_Walks_DogId",
                table: "Walks",
                newName: "IX_Walks_OwnerId");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "Users",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "Sex",
                table: "Users",
                newName: "Gender");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Users",
                newName: "RatePerHour");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Users",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "Users",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Breed",
                table: "Dogs",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Availabilities",
                newName: "EndTime");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Availabilities",
                newName: "WalkerId");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Walks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Walks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "Dogs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Dogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Availabilities",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Availabilities",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Availabilities",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Radius",
                table: "Availabilities",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Walks",
                table: "Walks",
                columns: new[] { "WalkerId", "StartTime" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Availabilities",
                table: "Availabilities",
                columns: new[] { "WalkerId", "StartTime" });

            migrationBuilder.CreateTable(
                name: "DogWalk",
                columns: table => new
                {
                    DogId = table.Column<int>(type: "int", nullable: false),
                    WalkId = table.Column<int>(type: "int", nullable: false),
                    WalkerId = table.Column<int>(type: "int", nullable: false),
                    WalkStartTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DogWalk", x => new { x.DogId, x.WalkId });
                    table.ForeignKey(
                        name: "FK_DogWalk_Dogs_DogId",
                        column: x => x.DogId,
                        principalTable: "Dogs",
                        principalColumn: "DogId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DogWalk_Walks_WalkerId_WalkStartTime",
                        columns: x => new { x.WalkerId, x.WalkStartTime },
                        principalTable: "Walks",
                        principalColumns: new[] { "WalkerId", "StartTime" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserName",
                table: "Users",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DogWalk_WalkerId_WalkStartTime",
                table: "DogWalk",
                columns: new[] { "WalkerId", "WalkStartTime" });

            migrationBuilder.AddForeignKey(
                name: "FK_Availabilities_Users_WalkerId",
                table: "Availabilities",
                column: "WalkerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Walks_Users_OwnerId",
                table: "Walks",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Walks_Users_WalkerId",
                table: "Walks",
                column: "WalkerId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availabilities_Users_WalkerId",
                table: "Availabilities");

            migrationBuilder.DropForeignKey(
                name: "FK_Walks_Users_OwnerId",
                table: "Walks");

            migrationBuilder.DropForeignKey(
                name: "FK_Walks_Users_WalkerId",
                table: "Walks");

            migrationBuilder.DropTable(
                name: "DogWalk");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Walks",
                table: "Walks");

            migrationBuilder.DropIndex(
                name: "IX_Users_UserName",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Availabilities",
                table: "Availabilities");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Walks");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Walks");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "Dogs");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Dogs");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Availabilities");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Availabilities");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Availabilities");

            migrationBuilder.DropColumn(
                name: "Radius",
                table: "Availabilities");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Walks",
                newName: "Rate");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Walks",
                newName: "DogId");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Walks",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "WalkerId",
                table: "Walks",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Walks_OwnerId",
                table: "Walks",
                newName: "IX_Walks_DogId");

            migrationBuilder.RenameColumn(
                name: "RatePerHour",
                table: "Users",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Users",
                newName: "Street");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Users",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Users",
                newName: "Sex");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Users",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Dogs",
                newName: "Breed");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Availabilities",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "WalkerId",
                table: "Availabilities",
                newName: "UserId");

            migrationBuilder.AddColumn<int>(
                name: "ApartmentNr",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Biography",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "BuildingNr",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Dogs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sex",
                table: "Dogs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Walks",
                table: "Walks",
                columns: new[] { "UserId", "Date", "DogId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Availabilities",
                table: "Availabilities",
                columns: new[] { "UserId", "Date" });

            migrationBuilder.AddForeignKey(
                name: "FK_Availabilities_Users_UserId",
                table: "Availabilities",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Walks_Dogs_DogId",
                table: "Walks",
                column: "DogId",
                principalTable: "Dogs",
                principalColumn: "DogId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Walks_Users_UserId",
                table: "Walks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
