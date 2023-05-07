using System.ComponentModel.DataAnnotations;

namespace DogWalkingAPI.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string UserPassword { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public int BuildingNr { get; set; }
        [Required]
        public int ApartmentNr { get; set; }
        [Required]
        public string Phone { get; set; }
        public string Biography { get; set; }
        [Required]
        public Sex Sex { get; set; }
        public double Rating { get; set; }
        public int NrOfWalks { get; set; }
        public ICollection<Dog> Dogs { get; set; }
        public ICollection<Availability> Availabilities { get; set; }
        public ICollection<Walk> Walks { get; set; }
    }
}
