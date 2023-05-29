using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DogWalkingAPI.Model;
using System.Security.Cryptography;
using System.Runtime.Intrinsics.Arm;
using System.Text;

namespace DogWalkingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public UsersController(DataBaseContext context)
        {
            _context = context;
        }

        // POST: api/Users/Login
        [HttpPost("Login")]
        public ActionResult<User> Login(string username, string password)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'DataBaseContext.Users'  is null.");
            }
            using (SHA256 hashFunction = SHA256.Create())
            {
                byte[] hashValue = hashFunction.ComputeHash(Encoding.UTF8.GetBytes(password));
                string hashedPassword = Encoding.Default.GetString(hashValue);
                if (_context.Users.FirstOrDefault(u => u.UserName.Equals(username) && u.UserPassword.Equals(password)) != null)
                {
                    return Ok();
                }
                return Unauthorized();
            }
        }

        // POST: api/Users/Register
        [HttpPost("Register")]
        public ActionResult<User> Register(User user)
        {
            User newUser = new User();
            newUser.UserName = user.UserName;
            newUser.FirstName = user.FirstName;
            newUser.LastName = user.LastName;
            newUser.Email = user.Email;
            using (SHA256 hashFunction = SHA256.Create())
            {
                byte[] hashValue = hashFunction.ComputeHash(Encoding.UTF8.GetBytes(user.UserPassword));
                string hashedPassword = Encoding.Default.GetString(hashValue);
                newUser.UserPassword = hashedPassword;
            }
            _context.Users.Add(user);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // GET: api/Users/GetUser
        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var userFound = await _context.Users.FirstOrDefaultAsync(u => u.UserName.Equals(username));

            if (userFound == null)
            {
                return NotFound();
            }

            return userFound;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{username}")]
        public async Task<ActionResult<User>> EditUser(string username, User user)
        {
            //username, firstName, lastName, description, gender, ratePerHour, email, phoneNumber
            if (username != user.UserName)
            {
                return BadRequest();
            }

            var userFound = _context.Users.FirstOrDefault(u => u.UserName.Equals(username));
            if (userFound == null)
            {
                return NotFound();
            }
            userFound.UserName = user.UserName;
            userFound.FirstName = user.FirstName;
            userFound.LastName = user.LastName;
            userFound.Email = user.Email;
            userFound.Description = user.Description;
            userFound.Gender = user.Gender;
            userFound.RatePerHour = user.RatePerHour;
            userFound.PhoneNumber = user.PhoneNumber;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
            return Ok();
        }

        // GET: api/Users/GetUserDogs
        [HttpGet("GetUserDogs/{username}")]
        public async Task<ActionResult<ICollection<Dog>>> GetUserDogs(string username)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var userFound = await _context.Users.FirstOrDefaultAsync(u => u.UserName.Equals(username));

            if (userFound == null)
            {
                return NotFound();
            }

            var dogs = userFound.Dogs;
            if (dogs == null) return Enumerable.Empty<Dog>().ToList();

            return dogs.ToList();
        }

        //// GET: api/Users
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        //{
        //    if (_context.Users == null)
        //    {
        //        return NotFound();
        //    }
        //    return await _context.Users.ToListAsync();
        //}

        //// GET: api/Users/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(int id)
        //{
        //    if (_context.Users == null)
        //    {
        //        return NotFound();
        //    }
        //    var user = await _context.Users.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}

        //// PUT: api/Users/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUser(int id, User user)
        //{
        //    if (id != user.UserId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(user).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Users
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<User>> PostUser(User user)
        //{
        //    if (_context.Users == null)
        //    {
        //        return Problem("Entity set 'DataBaseContext.Users'  is null.");
        //    }
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        //}

        //// DELETE: api/Users/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser(int id)
        //{
        //    if (_context.Users == null)
        //    {
        //        return NotFound();
        //    }
        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Users.Remove(user);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
        }

        private bool UserExists(string username)
        {
            return (_context.Users?.Any(e => e.UserName == username)).GetValueOrDefault();
        }
    }
}
