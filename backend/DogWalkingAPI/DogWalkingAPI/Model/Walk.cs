using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    [PrimaryKey(nameof(UserId), nameof(Date), nameof(DogId))]
    public class Walk
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int DogId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public DateTime Date { get; set; }
        [Required]

        public double Rate { get; set; }

        [ForeignKey("DogId")]
        [Required]
        public Dog? Dog { get; set; }
    }
}
