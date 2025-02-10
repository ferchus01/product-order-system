using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using Project.BusinessLogic.Interfaces;
using Project.MethodParameters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Project.WebApi.Controllers.User
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;


        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserIn registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var newUser = await _userService.RegisterUserAsync(registerDto);

                return CreatedAtAction(nameof(GetUserById),
                    new { userId = newUser.UserId },
                    new
                    {
                        userId = newUser.UserId,
                        email = newUser.Email
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            // Implementar búsqueda en BD, etc.
            return Ok("Usuario de ejemplo");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginIn loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 1. Validar credenciales llamando a la capa de negocio
            var user = await _userService.ValidateUserCredentialsAsync(loginDto);
            if (user == null)
                return Unauthorized(new { message = "Credenciales inválidas." });

            // 2. Generar el token JWT
            var token = GenerateJwtToken(user);

            // 3. Retornar el token
            return Ok(new { token });
        }

        private string GenerateJwtToken(Entities.User user)
        {
            // 1. Datos de configuración
            var secretKey = _configuration["Jwt:SecretKey"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            // 2. Credenciales
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 3. Claims
            var claims = new List<Claim>
        {
            new Claim("UserId", user.UserId.ToString()),
            new Claim("Role",user.RoleId.ToString()),
            new Claim("Username",user.Username.ToString()),
        };

            // 4. Crear token
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2), // duracion de 2 horas
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
