using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DogWalkingAPI.Model;

namespace DogWalkingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalksController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public WalksController(DataBaseContext context)
        {
            _context = context;
        }

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
        public async Task<IActionResult> PutWalk(int id, Walk walk)
        {
            if (id != walk.UserId)
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

        // POST: api/Walks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Walk>> PostWalk(Walk walk)
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
                if (WalkExists(walk.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWalk", new { id = walk.UserId }, walk);
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

        private bool WalkExists(int id)
        {
            return (_context.Walks?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
