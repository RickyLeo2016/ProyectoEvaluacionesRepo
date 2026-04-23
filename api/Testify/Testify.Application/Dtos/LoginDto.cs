using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Application.Dtos
{
    public class LoginRequestDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponseDto
    {
        public long usuId { get; init; }
        public long empId { get; init; }
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }
}
