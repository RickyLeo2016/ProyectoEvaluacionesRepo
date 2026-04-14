using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.UsuarioRol.Commands
{
    public class AssignUsuarioRolCommand : IRequest<ApiResponse<bool>>
    {
        public long usuId { get; set; }
        public List<AssignUsuarioRolDto>? roles { get; set; }
    }
}
