using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    public class Availability
    {
        [Key]
        virtual public int AvailabilityId { get; set; }

        [Required]
        virtual public int WalkerId { get; set; }

        virtual public DateTime StartTime { get; set; }

        [Required]
        virtual public DateTime EndTime { get; set; }

        [Required]
        virtual public double Latitude { get; set; }

        [Required]
        virtual public double Longitude { get; set; }

        [Required]
        virtual public double Radius { get; set; }
    }
}
