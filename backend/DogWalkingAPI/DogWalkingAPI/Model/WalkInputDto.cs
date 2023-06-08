public class WalkInputDto
{
    public string OwnerUsername { get; set; }
    public DateTime Day { get; set; }
    public string HourRange { get; set; }
    public int[] DogIds { get; set; }
    public int WalkerId { get; set; }
}