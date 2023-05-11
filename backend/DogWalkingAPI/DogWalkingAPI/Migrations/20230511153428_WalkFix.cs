using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class WalkFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DogWalks_Walks_WalkerId_WalkStartTime",
                table: "DogWalks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Walks",
                table: "Walks");

            migrationBuilder.DropIndex(
                name: "IX_DogWalks_WalkerId_WalkStartTime",
                table: "DogWalks");

            migrationBuilder.DropColumn(
                name: "WalkStartTime",
                table: "DogWalks");

            migrationBuilder.DropColumn(
                name: "WalkerId",
                table: "DogWalks");

            migrationBuilder.AddColumn<int>(
                name: "WalkId",
                table: "Walks",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Walks",
                table: "Walks",
                column: "WalkId");

            migrationBuilder.CreateIndex(
                name: "IX_Walks_WalkerId",
                table: "Walks",
                column: "WalkerId");

            migrationBuilder.CreateIndex(
                name: "IX_DogWalks_WalkId",
                table: "DogWalks",
                column: "WalkId");

            migrationBuilder.AddForeignKey(
                name: "FK_DogWalks_Walks_WalkId",
                table: "DogWalks",
                column: "WalkId",
                principalTable: "Walks",
                principalColumn: "WalkId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DogWalks_Walks_WalkId",
                table: "DogWalks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Walks",
                table: "Walks");

            migrationBuilder.DropIndex(
                name: "IX_Walks_WalkerId",
                table: "Walks");

            migrationBuilder.DropIndex(
                name: "IX_DogWalks_WalkId",
                table: "DogWalks");

            migrationBuilder.DropColumn(
                name: "WalkId",
                table: "Walks");

            migrationBuilder.AddColumn<DateTime>(
                name: "WalkStartTime",
                table: "DogWalks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "WalkerId",
                table: "DogWalks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Walks",
                table: "Walks",
                columns: new[] { "WalkerId", "StartTime" });

            migrationBuilder.CreateIndex(
                name: "IX_DogWalks_WalkerId_WalkStartTime",
                table: "DogWalks",
                columns: new[] { "WalkerId", "WalkStartTime" });

            migrationBuilder.AddForeignKey(
                name: "FK_DogWalks_Walks_WalkerId_WalkStartTime",
                table: "DogWalks",
                columns: new[] { "WalkerId", "WalkStartTime" },
                principalTable: "Walks",
                principalColumns: new[] { "WalkerId", "StartTime" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
