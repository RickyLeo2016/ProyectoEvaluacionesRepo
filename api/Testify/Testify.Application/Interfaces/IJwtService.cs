using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Testify.Application.Dtos;

namespace Testify.Application.Interfaces
{
    // Interfaz que define la generación de tokens
    public interface IJwtService
    {
        //LoginResponseDto GenerateToken(string username);
        LoginResponseDto GenerateToken(string username, long usuId, long empId);
    }
}
