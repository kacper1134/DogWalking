namespace DogWalkingAPI.Model
{
    public class Dog
    {
        public int DogId { get; set; }
        public string? Name { get; set; }
        public Sex Sex { get; set; }
        public int Age { get; set; }
        public string? Breed { get; set; }
        public User? Owner { get; set; }
    }
}
