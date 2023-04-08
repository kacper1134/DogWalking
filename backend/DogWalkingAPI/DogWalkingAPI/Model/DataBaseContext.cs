using Microsoft.EntityFrameworkCore;

namespace DogWalkingAPI.Model
{
    public class DataBaseContext : DbContext
    {
        protected DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<Dog> Dogs { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Walk> Walks { get; set; }

        public DbSet<Availability> Availabilities { get; set; }
    }
}
