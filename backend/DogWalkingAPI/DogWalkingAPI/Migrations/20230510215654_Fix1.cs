using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class Fix1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DogWalk_Dogs_DogId",
                table: "DogWalk");

            migrationBuilder.DropForeignKey(
                name: "FK_DogWalk_Walks_WalkerId_WalkStartTime",
                table: "DogWalk");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DogWalk",
                table: "DogWalk");

            migrationBuilder.RenameTable(
                name: "DogWalk",
                newName: "DogWalks");

            migrationBuilder.RenameIndex(
                name: "IX_DogWalk_WalkerId_WalkStartTime",
                table: "DogWalks",
                newName: "IX_DogWalks_WalkerId_WalkStartTime");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DogWalks",
                table: "DogWalks",
                columns: new[] { "DogId", "WalkId" });

            migrationBuilder.AddForeignKey(
                name: "FK_DogWalks_Dogs_DogId",
                table: "DogWalks",
                column: "DogId",
                principalTable: "Dogs",
                principalColumn: "DogId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DogWalks_Walks_WalkerId_WalkStartTime",
                table: "DogWalks",
                columns: new[] { "WalkerId", "WalkStartTime" },
                principalTable: "Walks",
                principalColumns: new[] { "WalkerId", "StartTime" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DogWalks_Dogs_DogId",
                table: "DogWalks");

            migrationBuilder.DropForeignKey(
                name: "FK_DogWalks_Walks_WalkerId_WalkStartTime",
                table: "DogWalks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DogWalks",
                table: "DogWalks");

            migrationBuilder.RenameTable(
                name: "DogWalks",
                newName: "DogWalk");

            migrationBuilder.RenameIndex(
                name: "IX_DogWalks_WalkerId_WalkStartTime",
                table: "DogWalk",
                newName: "IX_DogWalk_WalkerId_WalkStartTime");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DogWalk",
                table: "DogWalk",
                columns: new[] { "DogId", "WalkId" });

            migrationBuilder.AddForeignKey(
                name: "FK_DogWalk_Dogs_DogId",
                table: "DogWalk",
                column: "DogId",
                principalTable: "Dogs",
                principalColumn: "DogId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DogWalk_Walks_WalkerId_WalkStartTime",
                table: "DogWalk",
                columns: new[] { "WalkerId", "WalkStartTime" },
                principalTable: "Walks",
                principalColumns: new[] { "WalkerId", "StartTime" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
