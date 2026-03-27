using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Rol.Commands
{
    public class DeleteRolCommand : IRequest<ApiResponse<bool>>
    {
        public long? rolId { get; init; } 
    }
}
