namespace DogWalkingAPI.Model
{
    public class Walk
    {
        public User? User { get; set; }

        public DateTime Date { get; set; }

        public double Rate { get; set; }

        public Dog? Dog { get; set; }
    }
}
