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
    public class DogsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public DogsController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Dogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dog>>> GetDogs()
        {
          if (_context.Dogs == null)
          {
              return NotFound();
          }
            return await _context.Dogs.ToListAsync();
        }

        // GET: api/Dogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dog>> GetDog(int id)
        {
          if (_context.Dogs == null)
          {
              return NotFound();
          }
            var dog = await _context.Dogs.FindAsync(id);

            if (dog == null)
            {
                return NotFound();
            }

            return dog;
        }

        // PUT: api/Dogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDog(int id, Dog dog)
        {
            if (id != dog.DogId)
            {
                return BadRequest();
            }

            _context.Entry(dog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DogExists(id))
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

        // POST: api/Dogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Dog>> CreateDog(string username, string dogName, string birthday, string description, string imageUrl)
        {
          if (_context.Dogs == null)
          {
              return Problem("Entity set 'DataBaseContext.Dogs'  is null.");
          }
            Dog dog = new Dog();
            dog.Description = description;
            dog.ImageUrl = imageUrl;
            dog.Name = dogName;
            var user = FindUserByUsername(username).Result;
            if (user == null)
            {
                return NotFound();
            }
            dog.Birthday = DateTime.Parse(birthday);
            if (user.Dogs == null)
            {
                user.Dogs = new LinkedList<Dog>();
            }
            user.Dogs.Add(dog);
            _context.Dogs.Add(dog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDog", new { id = dog.DogId }, dog);
        }

        // DELETE: api/Dogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDog(int id)
        {
            if (_context.Dogs == null)
            {
                return NotFound();
            }
            var dog = await _context.Dogs.FindAsync(id);
            if (dog == null)
            {
                return NotFound();
            }

            _context.Dogs.Remove(dog);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DogExists(int id)
        {
            return (_context.Dogs?.Any(e => e.DogId == id)).GetValueOrDefault();
        }

        private async Task<User> FindUserByUsername(string username)
        {
           var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName.Equals(username));
            return user;
        }
    }
}
