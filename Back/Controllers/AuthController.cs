using Microsoft.AspNetCore.Mvc;

using DatingApp.Models;
using DatingApp.Data;
using DatingApp.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;


using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System;
using AutoMapper;

namespace DatingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config, ILogger<AuthController> logger, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            _config = config;
            _logger = logger;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegesterDto userForRegesterDto)
        // public async Task<ActionResult<User>> Register(UserForRegesterDto userForRegesterDto)
        {
            userForRegesterDto.Username = userForRegesterDto.Username.ToLower();

            if (await _repo.UserExist(userForRegesterDto.Username))
                return BadRequest("نام کاربری از قبل وجود دارد");

            var userToCreate = _mapper.Map<User>(userForRegesterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegesterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailsDto>(createdUser);

            return CreatedAtRoute("GetUser",new {controller= "Users",id = createdUser.Id},userToReturn);

            
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username)

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserForListDto>(userFromRepo);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }


    }
}