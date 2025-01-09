using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using Project.BusinessLogic.Interfaces;
using Project.MethodParameters;

namespace Project.WebApi.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserIn registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var newUser = await _userService.RegisterUserAsync(registerDto);

                // Devuelves un 201 con algunos datos (no incluyas la contraseña).
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
                // Podrías usar un tipo de excepción custom para diferenciar errores 
                // de validación y regresar un status code distinto
                return BadRequest(new { message = ex.Message });
            }
        }

        // Ejemplo de un método GET para obtener un usuario (opcional)
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            // Implementar búsqueda en BD, etc.
            return Ok("Usuario de ejemplo");
        }
    }
}
