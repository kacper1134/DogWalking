using Microsoft.EntityFrameworkCore;

namespace DogWalkingAPI.Model
{
    [PrimaryKey(nameof(DogId), nameof(WalkId))]
    public class DogWalk
    {
        public int DogId { get; set; }
        public int WalkId { get; set; }
        public Dog Dog { get; set; }
        public Walk Walk { get; set; }
    }
}
