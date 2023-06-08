using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DogWalkingAPI.Migrations
{
    /// <inheritdoc />
    public partial class dogwalk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DogWalks");

            migrationBuilder.CreateTable(
                name: "DogWalk",
                columns: table => new
                {
                    DogsDogId = table.Column<int>(type: "int", nullable: false),
                    WalksWalkId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DogWalk", x => new { x.DogsDogId, x.WalksWalkId });
                    table.ForeignKey(
                        name: "FK_DogWalk_Dogs_DogsDogId",
                        column: x => x.DogsDogId,
                        principalTable: "Dogs",
                        principalColumn: "DogId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DogWalk_Walks_WalksWalkId",
                        column: x => x.WalksWalkId,
                        principalTable: "Walks",
                        principalColumn: "WalkId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DogWalk_WalksWalkId",
                table: "DogWalk",
                column: "WalksWalkId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DogWalk");

            migrationBuilder.CreateTable(
                name: "DogWalks",
                columns: table => new
                {
                    DogId = table.Column<int>(type: "int", nullable: false),
                    WalkId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DogWalks", x => new { x.DogId, x.WalkId });
                    table.ForeignKey(
                        name: "FK_DogWalks_Dogs_DogId",
                        column: x => x.DogId,
                        principalTable: "Dogs",
                        principalColumn: "DogId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DogWalks_Walks_WalkId",
                        column: x => x.WalkId,
                        principalTable: "Walks",
                        principalColumn: "WalkId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DogWalks_WalkId",
                table: "DogWalks",
                column: "WalkId");
        }
    }
}
