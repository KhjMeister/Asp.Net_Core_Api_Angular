using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using DatingApp.Data;
using DatingApp.Models;
using AutoMapper;
using DatingApp.Dtos;
using System.Security.Claims;
using System;
using DatingApp.Helpers;

namespace DatingApp.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
       
        [HttpGet] 
        public async Task<ActionResult<IEnumerable<User>>> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;
            if(string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female":"male";
            }

            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount,users.TotalPages);

            return Ok(usersToReturn);
        }


      
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult<User>> GetUser(int id)
        {

            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailsDto>(user);

            if (userToReturn == null)
            {
                return NotFound();
            }

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        {
            return Unauthorized();
        }

        var userFromRepo = await _repo.GetUser(id);

        _mapper.Map(userForUpdateDto,userFromRepo);

        if(await _repo.SaveAll())
            return NoContent();

        throw new Exception($"بروزرسانی اطلاعات {id} با مشکل مواجه شد");

    }
    [HttpPost("{id}/like/{recipientId}")]

    public async Task<IActionResult> LikeUser(int id, int recipientId)
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
        
        var like = await _repo.GetLike(id, recipientId);

        if(like != null)
            return BadRequest("شما قبلا این کاربر را پسندیده اید!");

        if(await _repo.GetUser(recipientId) == null)
            return NotFound();
        
        like = new Like
        {
            LikerId = id,
            LikeeId  = recipientId
        };

        _repo.Add<Like>(like);

        if(await _repo.SaveAll())
            return Ok();
            
        return BadRequest("ناموفق در لایک کاربر");
    }

}
    // PUT: api/Users/5

    

    // // POST: api/Users
    // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPost]
    // public async Task<ActionResult<User>> PostUser(User user)
    // {
    //     _repo.Users.Add(user);
    //     await _repo.SaveChangesAsync();

    //     return CreatedAtAction("GetUser", new { id = user.Id }, user);
    // }

    // // DELETE: api/Users/5
    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteUser(int id)
    // {
    //     var user = await _repo.Users.FindAsync(id);
    //     if (user == null)
    //     {
    //         return NotFound();
    //     }

    //     _repo.Users.Remove(user);
    //     await _repo.SaveChangesAsync();

    //     return NoContent();
    // }

    // private bool UserExists(int id)
    // {
    //     return _repo.Users.Any(e => e.Id == id);
    // }
// }
}
