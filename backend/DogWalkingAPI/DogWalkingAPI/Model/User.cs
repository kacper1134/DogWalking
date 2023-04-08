namespace DogWalkingAPI.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public int Age { get; set; }
        public string? Email { get; set; }
        public string? UserPassword { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public int BuildingNr { get; set; }
        public int ApartmentNr { get; set; }
        public string? Phone { get; set; }
        public string? Biography { get; set; }
        public Sex Sex { get; set; }
        public double Rating { get; set; }
        public int NrOfWalks { get; set; }
    }
}
