using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DogWalkingAPI.Model;
using Microsoft.IdentityModel.Tokens;

namespace DogWalkingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalksController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private Dictionary<int, (double,double)> _currentWalks;

        public WalksController(DataBaseContext context)
        {
            _context = context;
            _currentWalks = new Dictionary<int, (double, double)>();
        }

        // GET: api/Walks/GetAllWalkerWalks
        [HttpGet("GetAllWalkerWalks")]
        public async Task<ActionResult<IEnumerable<Walk>>> GetAllWalkerWalks(string username)
        {
            if (_context.Walks == null)
            {
                return NotFound();
            }
            User? walker = await _context.Users?.FirstOrDefaultAsync(u => u.UserName == username);
            if (walker == null)
            {
                return NotFound();
            }
            return walker.WalkerWalks.ToList();
        }

        // GET: api/Walks/GetAllOwnerWalks
        [HttpGet("GetAllOwnerWalks")]
        public async Task<ActionResult<IEnumerable<Walk>>> GetAllOwnerWalks(string username)
        {
            if (_context.Walks == null)
            {
                return NotFound();
            }
            User? walker = await _context.Users?.FirstOrDefaultAsync(u => u.UserName == username);
            if (walker == null)
            {
                return NotFound();
            }
            return walker.OwnerWalks.ToList();
        }

        // GET: api/Walks/GetReview
        [HttpGet("GetReview")]
        public ActionResult<Review> GetReview(int walkId)
        {
            if (_context.Walks == null)
            {
                return NotFound();
            }
            Walk? walk = _context.Walks?.FirstOrDefault(w => w.WalkId == walkId);
            if (walk == null)
            {
                return NotFound();
            }
            Review review = new Review();
            review.Rating = walk.Rating;
            review.Content = walk.Content;
            return review;
        }

        // POST: api/Walks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateWalk")]
        public async Task<ActionResult<Walk>> CreateWalk(Walk walk)
        {
            if (_context.Walks == null)
            {
                return Problem("Entity set 'DataBaseContext.Walks'  is null.");
            }
            _context.Walks.Add(walk);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WalkExists(walk.WalkerId, walk.StartTime))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWalk", new { id = walk.WalkerId }, walk);
        }

        // GET: api/Walks/StartWalk
        [HttpPost("StartWalk")]
        public ActionResult<(double, double)> StartWalk(int walkId, double lat, double lng)
        {
            if (_currentWalks == null)
            {
                return NotFound();
            }
            _currentWalks[walkId] = (lat, lng);
            return Ok();
        }

        // GET: api/Walks/CurrentWalksPosition/{id}
        [HttpGet("GetCurrentWalksPosition")]
        public ActionResult<(double,double)> GetCurrentWalksPosition(int walkId)
        {
            if (_currentWalks.IsNullOrEmpty())
            {
                return NotFound();
            }
            if (_currentWalks.ContainsKey(walkId))
            {
                return _currentWalks[walkId];
            }
            return NotFound();
        }

        // POST: api/Walks/GetCurrentWalksPosition/{id}
        [HttpPost("CurrentWalksPosition")]
        public ActionResult<(double, double)> UpdateCurrentWalksPosition(int walkId, double lat, double lng)
        {
            if (_currentWalks.IsNullOrEmpty())
            {
                return NotFound();
            }
            if (_currentWalks.ContainsKey(walkId))
            {
                _currentWalks[walkId] = (lat, lng);
                return Ok();
            }
            return NotFound();
        }

        // GET: api/Walks/CancelWalk/{id}
        [HttpPost("CancelWalk")]
        public ActionResult<IEnumerable<Walk>> CancelWalk(int walkId)
        {
            if (_context.Walks == null)
            {
                return NotFound();
            }
            var currentTime = DateTime.Now;
            var walk = _context.Walks.FirstOrDefault(w => w.WalkId == walkId);
            if (walk == null)
            {
                return NotFound();
            }
            if (walk.StartTime < currentTime)
            {
                return NotFound("Can't cancel finished walks!");
            }
            _context.Walks.Remove(walk);
            return Ok();
        }

        // GET: api/Walks/StopWalk/{id}
        [HttpPost("StopWalk")]
        public ActionResult<IEnumerable<Walk>> StopWalk(int walkId) //TODO
        {
            if (_currentWalks.IsNullOrEmpty())
            {
                return NotFound("No walk with given ID!");
            }
            _currentWalks.Remove(walkId);
            return Ok();
        }

        // GET: api/Walks/AddReview
        //[HttpGet("AddReview")]
        //public async Task<ActionResult<IEnumerable<Walk>>> AddReview(int id, double rating, string content)
        //{
        //    if (_context.Walks == null)
        //    {
        //        return NotFound();
        //    }
        //    User? walker = _context.Users?.FirstOrDefaultAsync(u => u.UserName == username).Result;
        //    if (walker == null)
        //    {
        //        return NotFound();
        //    }
        //    return walker.OwnerWalks.ToList();
        //}


        // GET: api/Walks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Walk>>> GetWalks()
        {
          if (_context.Walks == null)
          {
              return NotFound();
          }
            return await _context.Walks.ToListAsync();
        }

        // GET: api/Walks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Walk>> GetWalk(int id)
        {
          if (_context.Walks == null)
          {
              return NotFound();
          }
            var walk = await _context.Walks.FindAsync(id);

            if (walk == null)
            {
                return NotFound();
            }

            return walk;
        }

        // PUT: api/Walks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> AddReview(int id, Walk walk)
        {
            if (id != walk.WalkId)
            {
                return BadRequest();
            }

            _context.Entry(walk).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WalkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Walks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWalk(int id)
        {
            if (_context.Walks == null)
            {
                return NotFound();
            }
            var walk = await _context.Walks.FindAsync(id);
            if (walk == null)
            {
                return NotFound();
            }

            _context.Walks.Remove(walk);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WalkExists(int walkerId, DateTime startTime)
        {
            return (_context.Walks?.Any(e => e.WalkerId == walkerId && e.StartTime == startTime)).GetValueOrDefault();
        }

        private bool WalkExists(int walkId)
        {
            return (_context.Walks?.Any(e => e.WalkId == walkId)).GetValueOrDefault();
        }
    }
}
