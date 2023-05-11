using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace DogWalkingAPI.Model
{
    [Index(nameof(UserName), IsUnique = true)]
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set;}
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }
        public int Age { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string UserPassword { get; set; }
        public string ImageUrl { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public Gender Gender { get; set; }
        public double RatePerHour { get; set; }
        public int NrOfWalks { get; set; }
        public ICollection<Dog> Dogs { get; set; }
        public ICollection<Availability> Availabilities { get; set; }
        virtual public ICollection<Walk> WalkerWalks { get; set; }
        virtual public ICollection<Walk> OwnerWalks { get; set; }
    }
}
