﻿using System;
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
    public class AvailabilitiesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public AvailabilitiesController(DataBaseContext context)
        {
            _context = context;
        }

        // POST: api/Availabilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Availability>> AddAvailabilities(ICollection<Availability> availabilities)
        {
            // todo - arguments are strings, convert them to availabilities
            if (_context.Availabilities == null)
            {
                return Problem("Entity set 'DataBaseContext.Availabilities'  is null.");
            }
            foreach (Availability availability in availabilities)
            {
                if (AvailabilityExists(availability.WalkerId, availability.StartTime))
                {
                    return Conflict();
                }
                _context.Users.FirstOrDefault(u => u.UserId == availability.WalkerId).Availabilities.Add(availability);
                _context.Availabilities.Add(availability);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/Availabilities
        [HttpGet]
        public ActionResult<IEnumerable<Availability>> GetAvailabilities(int walkerId)
        {
            if (_context.Availabilities == null)
            {
                return NotFound();
            }
            return _context.Availabilities.Where(a => a.WalkerId == walkerId).ToList();
        }

        // POST: api/Availabilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("ChangeLocation")]
        public async Task<ActionResult<Availability>> ChangeLocation(string userName, double lat, double lng, double radius)
        {
            if (_context.Availabilities == null)
            {
                return Problem("Entity set 'DataBaseContext.Availabilities'  is null.");
            }
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return NotFound("User " + userName + " not found!");
            }
            var availabilities = _context.Availabilities.Where(a => a.WalkerId == user.UserId).ToList();
            foreach (Availability availability in availabilities)
            {
                availability.Latitude = lat;
                availability.Longitude = lng;
                availability.Radius = radius;
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        //[EdmFunction("Availability", "IsInRange")]
        //public static int YearsSince(DateTime date)
        //{
        //    throw new NotSupportedException("Direct calls are not supported.");
        //}

        // GET: api/Availabilities/GetWalkers
        [HttpGet("GetWalkers")]
        public ActionResult<IEnumerable<Availability>> GetWalkers(double lat, double lng, double maximumRange, 
            string startDate, string endDate)
        {
            if (_context.Availabilities == null)
            {
                return NotFound();
            }
            //var foundAvailabilities = from a in _context.Availabilities
            //                          where IsInRange(a.Latitude, a.Latitude, a.Radius, lat, lng, maximumRange)
            //                          select a;
            //var users = foundAvailabilities
            var foundAvailabilities = new LinkedList<Availability>();
            var x = _context.Availabilities.Where(a => true);
            return foundAvailabilities.ToList();
            return Ok();
        }

        //bool IsInRange(double x1, double y1, double r1, double x2, double y2, double r2)
        //{
        //    //double d = Math.Sqrt((x1 - x2) * (x1 - x2)
        //    //                + (y1 - y2) * (y1 - y2));

        //    //if (d <= r1 - r2)
        //    //{
        //    //    return true;
        //    //}
        //    //else if (d <= r2 - r1)
        //    //{
        //    //    return true;
        //    //}
        //    //else if (d < r1 + r2)
        //    //{
        //    //    return true;
        //    //}
        //    //else if (d == r1 + r2)
        //    //{
        //    //    return true;
        //    //}
        //    //else
        //    //{
        //    //    return false;
        //    //}
        //    return true;
        //}

        // ---------------------------------------

        // GET: api/Availabilities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Availability>> GetAvailability(int id)
        {
            if (_context.Availabilities == null)
            {
                return NotFound();
            }
            var availability = await _context.Availabilities.FindAsync(id);

            if (availability == null)
            {
                return NotFound();
            }

            return availability;
        }

        // PUT: api/Availabilities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutAvailability(int id, Availability availability)
        //{
        //    if (id != availability.WalkerId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(availability).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AvailabilityExists(id))
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

        // POST: api/Availabilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Availability>> PostAvailability(Availability availability)
        //{
        //  if (_context.Availabilities == null)
        //  {
        //      return Problem("Entity set 'DataBaseContext.Availabilities'  is null.");
        //  }
        //    _context.Availabilities.Add(availability);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (AvailabilityExists(availability.WalkerId))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetAvailability", new { id = availability.WalkerId }, availability);
        //}

        // DELETE: api/Availabilities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvailability(int id)
        {
            if (_context.Availabilities == null)
            {
                return NotFound();
            }
            var availability = await _context.Availabilities.FindAsync(id);
            if (availability == null)
            {
                return NotFound();
            }

            _context.Availabilities.Remove(availability);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAvailabilitiesByWalkerId(int walkerId)
        {
            var availabilities = await _context.Availabilities.Where(a => a.WalkerId == walkerId).ToListAsync();

            if (availabilities == null || availabilities.Count == 0)
            {
                return NotFound();
            }

            _context.Availabilities.RemoveRange(availabilities);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvailabilityExists(int id, DateTime startTime)
        {
            return (_context.Availabilities?.Any(e => e.WalkerId == id && e.StartTime == startTime)).GetValueOrDefault();
        }
    }
}
