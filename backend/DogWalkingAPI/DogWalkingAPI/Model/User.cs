using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace DogWalkingAPI.Model
{
    [Index(nameof(UserName), IsUnique = true)]
    public class User
    {
        [Key]
        virtual public int UserId { get; set; }
        [Required]
        virtual public string UserName { get; set;}
        [Required]
        virtual public string LastName { get; set; }
        [Required]
        virtual public string FirstName { get; set; }
        virtual public int Age { get; set; }
        [Required]
        [EmailAddress]
        virtual public string Email { get; set; }
        [Required]
        virtual public string UserPassword { get; set; }
        virtual public string ImageUrl { get; set; }
        virtual public string PhoneNumber { get; set; }
        virtual public string Description { get; set; }
        virtual public Gender Gender { get; set; }
        virtual public double RatePerHour { get; set; }
        virtual public int NrOfWalks { get; set; }
        virtual public ICollection<Dog> Dogs { get; set; }
        virtual public ICollection<Availability> Availabilities { get; set; }
        virtual public ICollection<Walk> WalkerWalks { get; set; }
        virtual public ICollection<Walk> OwnerWalks { get; set; }

        public User()
        {
            Dogs = new HashSet<Dog>();
            Availabilities = new HashSet<Availability>();
            WalkerWalks = new HashSet<Walk>();
            OwnerWalks = new HashSet<Walk>();
        }
    }
}
