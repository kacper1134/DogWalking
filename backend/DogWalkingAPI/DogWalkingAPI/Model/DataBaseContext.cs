using Microsoft.EntityFrameworkCore;

namespace DogWalkingAPI.Model
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Walk>()
                .HasOne(w => w.Owner)
                .WithMany(u => u.OwnerWalks)
                .HasForeignKey(u => u.OwnerId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Walk>()
                .HasOne(w => w.Walker)
                .WithMany(u => u.WalkerWalks)
                .HasForeignKey(u => u.WalkerId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        public DbSet<Dog> Dogs { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Walk> Walks { get; set; }

        public DbSet<DogWalk> DogWalks { get; set; }

        public DbSet<Availability> Availabilities { get; set; }
    }
}
