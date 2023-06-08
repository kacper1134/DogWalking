using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DogWalkingAPI.Model;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using Stripe;
using Newtonsoft.Json;

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
        public ActionResult<Model.Review> GetReview(int walkId)
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
            Model.Review review = new Model.Review();
            review.Rating = walk.Rating;
            review.Content = walk.Content;
            return review;
        }

        // POST: api/Walks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateWalk")]
        public async Task<ActionResult<Walk>> CreateWalk([FromBody] WalkInputDto walkInputDto)
        {
            if (_context.Walks == null)
            {
                return Problem("Entity set 'DataBaseContext.Walks'  is null.");
            }

            Walk walk = new Walk();
            walk.WalkerId = walkInputDto.WalkerId;
            var walker = FindUserById(walkInputDto.WalkerId);
            var owner = FindUserByName(walkInputDto.OwnerUsername);
            if (walker == null || owner == null)
            {
                return NotFound();
            }
            walk.OwnerId = owner.UserId;
            DateTime startTime = walkInputDto.Day;
            DateTime endTime = walkInputDto.Day;
            string hourRange = walkInputDto.HourRange;
            startTime = startTime.AddHours(double.Parse(hourRange.Split('-')[0].Split(':')[0]));
            startTime = startTime.AddMinutes(double.Parse(hourRange.Split('-')[0].Split(':')[1]));
            endTime = endTime.AddHours(double.Parse(hourRange.Split('-')[1].Split(':')[0]));
            endTime = endTime.AddMinutes(double.Parse(hourRange.Split('-')[1].Split(':')[1]));
            walk.StartTime = startTime;
            walk.EndTime = endTime;

            foreach (var dogId in walkInputDto.DogIds)
            {
                var dog = await _context.Dogs.FirstOrDefaultAsync(d => d.DogId == dogId);
                if (dog == null)
                {
                    continue;
                }
                dog.Walks.Add(walk);
                walk.Dogs.Add(dog);
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

        [HttpGet("CreatePaymentIntent")]
        public ActionResult CreatePaymentIntent()
        {
            StripeConfiguration.ApiKey = "sk_test_7mJuPfZsBzc3JkrANrFrcDqC";

            var options = new PaymentIntentCreateOptions
            {
                Amount = 1099,
                Currency = "usd",
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            };
            var service = new PaymentIntentService();
            
            var intent = service.Create(options);
            return new JsonResult(new { client_secret = intent.ClientSecret });
        }

        [HttpPost("FinalizePayment")]
        public async Task<IActionResult> FinalizePayment()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            const string endpointSecret = "whsec_873f784690f51f8f552cd2e79cb60360cd2c13edc5d2dc723be349122d40e1c1";
            try
            {
                var stripeEvent = EventUtility.ParseEvent(json);
                var signatureHeader = Request.Headers["Stripe-Signature"];

                stripeEvent = EventUtility.ConstructEvent(json,
                        signatureHeader, endpointSecret);

                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    Console.WriteLine("A successful payment for {0} was made.", paymentIntent.Amount);
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                }
                else if (stripeEvent.Type == Events.PaymentMethodAttached)
                {
                    var paymentMethod = stripeEvent.Data.Object as PaymentMethod;
                    // Then define and call a method to handle the successful attachment of a PaymentMethod.
                    // handlePaymentMethodAttached(paymentMethod);
                }
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }
                return Ok();
            }
            catch (StripeException e)
            {
                Console.WriteLine("Error: {0}", e.Message);
                return BadRequest();
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
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

        private User? FindUserById(int id)
        {
            return _context.Users?.FirstOrDefault(u => u.UserId == id);
        }

        private User? FindUserByName(string name) 
        { 
            return _context.Users?.FirstOrDefault(u => u.UserName == name);
        }
    }
}
