using Testify.Application.Dtos;

namespace Testify.Application.Interfaces
{
    // Interfaz que define la generación de tokens
    public interface IJwtService
    {
        LoginResponseDto GenerateToken(string username);
    }
}
