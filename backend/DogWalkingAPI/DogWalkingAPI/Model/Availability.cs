using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    [PrimaryKey(nameof(WalkerId), nameof(StartTime))]
    public class Availability
    {
        [Required]
        public int WalkerId { get; set; }

        [ForeignKey("WalkerId")]
        public User Walker { get; set; }

        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public double Radius { get; set; }
    }
}
