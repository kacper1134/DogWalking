using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogWalkingAPI.Model
{
    public class Dog
    {
        [Key]
        virtual public int DogId { get; set; }
        [Required]
        virtual public string Name { get; set; }
        [Required]
        virtual public DateTime Birthday { get; set; }
        [Required]
        virtual public string Description { get; set; }
        [Required]
        virtual public string ImageUrl { get; set; }
        //[ForeignKey("OwnerId")]
        //public User? Owner { get; set; }
        virtual public ICollection<Walk> Walks { get; set; }
    }
}
