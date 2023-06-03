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
                string hashedPassword = System.Text.Encoding.Default.GetString(hashValue);
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
            if (username != user.UserName)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                var userFound = await _context.Users.FirstOrDefaultAsync(u => u.UserName.Equals(username));

                if (userFound != null)
                {
                    return userFound;
                }
            }
            return NotFound();
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
