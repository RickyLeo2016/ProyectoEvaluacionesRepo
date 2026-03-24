using MediatR;
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
        private readonly IUnitOfWork _unit;

        public AuthController(
            IJwtService jwtService, 
            IUnitOfWork unit)
        {
            _jwtService = jwtService;
            _unit = unit;
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var usuario = await _unit.Usuario.GetByNombreUsuarioAsync(request.Username);
            if (usuario == null)
                return Unauthorized(new { message = "Usuario o contraseña incorrectos." });

            bool passwordValid = BCrypt.Net.BCrypt.Verify(request.Password, usuario.usuPassHash);
            if (!passwordValid)
                return Unauthorized(new { message = "Contraseña incorrecta." });

            var loginResponse = _jwtService.GenerateToken(usuario.usuNombre, usuario.usuId);

            return Ok(loginResponse);
        }

    }
}
