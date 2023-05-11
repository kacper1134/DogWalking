using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    public class Dog
    {
        [Key]
        public int DogId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [ForeignKey("OwnerId")]
        public User? Owner { get; set; }
        virtual public ICollection<DogWalk> Walks { get; set; }
    }
}
