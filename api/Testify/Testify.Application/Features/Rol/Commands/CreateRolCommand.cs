using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Rol.Commands
{
    public class CreateRolCommand : IRequest<ApiResponse<bool>>
    {
        public string? rolNombre { get; init; } = string.Empty;
        public int? catIdEstado { get; init; }
        

    }
}
