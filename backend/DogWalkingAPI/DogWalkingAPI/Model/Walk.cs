using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    public class Walk
    {
        [Key]
        virtual public int WalkId { get; set; }

        [Required]
        virtual public int OwnerId { get; set; }

        [Required]
        virtual public int WalkerId { get; set; }

        [ForeignKey("WalkerId")]
        virtual public User? Walker { get; set; }

        [ForeignKey("OwnerId")]
        virtual public User? Owner { get; set; }

        [Required]
        virtual public DateTime StartTime { get; set; }

        [Required]
        virtual public DateTime EndTime { get; set; }

        virtual public double Rating { get; set; }

        virtual public string? Content { get; set; }

        virtual public bool IsStarted { get; set; }

        virtual public bool IsAwaitingPayment { get; set; }

        virtual public bool IsDone { get; set; }

        virtual public double Lat { get; set; }
        virtual public double Lng { get; set; }

        [Required]
        virtual public ICollection<Dog> Dogs { get; set; }

        public Walk()
        {
            Dogs = new HashSet<Dog>();
        }
    }
}
