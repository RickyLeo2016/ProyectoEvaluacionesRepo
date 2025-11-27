using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Infrastructure.Services
{
    // Servicio que genera tokens JWT
    public class JwtService : IJwtService
    {
        private readonly string _secret;
        private readonly int _expirationMinutes;

        public JwtService(IConfiguration configuration)
        {
            _secret = configuration["Jwt:Secret"] ?? "CLAVE_SECRETA_POR_DEFECTO";
            _expirationMinutes = int.TryParse(configuration["Jwt:ExpirationMinutes"], out var val) ? val : 60;
        }

        public LoginResponseDto GenerateToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_expirationMinutes),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new LoginResponseDto
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = tokenDescriptor.Expires ?? DateTime.UtcNow.AddMinutes(_expirationMinutes)
            };
        }
    }
}
