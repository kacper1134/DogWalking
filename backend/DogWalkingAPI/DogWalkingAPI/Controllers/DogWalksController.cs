//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using DogWalkingAPI.Model;

//namespace DogWalkingAPI.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DogWalksController : ControllerBase
//    {
//        private readonly DataBaseContext _context;

//        public DogWalksController(DataBaseContext context)
//        {
//            _context = context;
//        }

//        // GET: api/DogWalks
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<DogWalk>>> GetDogWalks()
//        {
//          if (_context.DogWalks == null)
//          {
//              return NotFound();
//          }
//            return await _context.DogWalks.ToListAsync();
//        }

//        // GET: api/DogWalks/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<DogWalk>> GetDogWalk(int id)
//        {
//          if (_context.DogWalks == null)
//          {
//              return NotFound();
//          }
//            var dogWalk = await _context.DogWalks.FindAsync(id);

//            if (dogWalk == null)
//            {
//                return NotFound();
//            }

//            return dogWalk;
//        }

//        // PUT: api/DogWalks/5
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutDogWalk(int id, DogWalk dogWalk)
//        {
//            if (id != dogWalk.DogId)
//            {
//                return BadRequest();
//            }

//            _context.Entry(dogWalk).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!DogWalkExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // POST: api/DogWalks
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPost]
//        public async Task<ActionResult<DogWalk>> PostDogWalk(DogWalk dogWalk)
//        {
//          if (_context.DogWalks == null)
//          {
//              return Problem("Entity set 'DataBaseContext.DogWalks'  is null.");
//          }
//            _context.DogWalks.Add(dogWalk);
//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateException)
//            {
//                if (DogWalkExists(dogWalk.DogId))
//                {
//                    return Conflict();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return CreatedAtAction("GetDogWalk", new { id = dogWalk.DogId }, dogWalk);
//        }

//        // DELETE: api/DogWalks/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteDogWalk(int id)
//        {
//            if (_context.DogWalks == null)
//            {
//                return NotFound();
//            }
//            var dogWalk = await _context.DogWalks.FindAsync(id);
//            if (dogWalk == null)
//            {
//                return NotFound();
//            }

//            _context.DogWalks.Remove(dogWalk);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool DogWalkExists(int id)
//        {
//            return (_context.DogWalks?.Any(e => e.DogId == id)).GetValueOrDefault();
//        }
//    }
//}
