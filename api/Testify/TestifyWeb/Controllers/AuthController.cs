using Microsoft.AspNetCore.Mvc;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace TestifyWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;

        public AuthController(IJwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequestDto request)
        {
            // Aquí se valida el usuario; en producción, contra la BD
            if (request.Username != "admin" || request.Password != "1234")
                return Unauthorized(new { message = "Usuario o contraseña incorrectos." });

            var token = _jwtService.GenerateToken(request.Username);
            return Ok(token);
        }
    }
}
