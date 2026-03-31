using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Rol.Commands
{
    public class UpdateRolCommand : IRequest<ApiResponse<bool>>
    {
        public long? rolId{ get; init; }
        public string? rolNombre { get; init; } = string.Empty;
        public long? usuIdReg { get; init; }

    }
}
