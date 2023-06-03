using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    [PrimaryKey(nameof(WalkerId), nameof(StartTime))]
    public class Availability
    {
        [Required]
        virtual public int WalkerId { get; set; }

        [ForeignKey("WalkerId")]
        virtual public User Walker { get; set; }

        virtual public DateTime StartTime { get; set; }

        [Required]
        virtual public DateTime EndTime { get; set; }

        [Required]
        virtual public double Latitude { get; set; }

        [Required]
        virtual public double Longitude { get; set; }

        [Required]
        virtual public double Radius { get; set; }

        bool IsInRange(double x2, double y2, double r2)
        {
            //double d = Math.Sqrt((x1 - x2) * (x1 - x2)
            //                + (y1 - y2) * (y1 - y2));

            //if (d <= r1 - r2)
            //{
            //    return true;
            //}
            //else if (d <= r2 - r1)
            //{
            //    return true;
            //}
            //else if (d < r1 + r2)
            //{
            //    return true;
            //}
            //else if (d == r1 + r2)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //}
            return true;
        }
    }
}
