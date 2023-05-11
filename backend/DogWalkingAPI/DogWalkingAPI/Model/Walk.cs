using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    public class Walk
    {
        [Key]
        public int WalkId { get; set; }

        [Required]
        public int OwnerId { get; set; }

        [Required]
        public int WalkerId { get; set; }

        [ForeignKey("WalkerId")]
        virtual public User? Walker { get; set; }

        [ForeignKey("OwnerId")]
        virtual public User? Owner { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        public double Rating { get; set; }

        public string Content { get; set; }

        [Required]
        public ICollection<DogWalk> Dogs { get; set; }
    }
}
