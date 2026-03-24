using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Usuario.Commands
{
    public class DeleteUsuarioCommand : IRequest<ApiResponse<bool>>
    {
        public long usuId { get; set; }
        public long usuIdReg { get; set; }

    }
}
