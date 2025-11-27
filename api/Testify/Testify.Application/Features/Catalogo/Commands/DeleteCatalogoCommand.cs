using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Catalogo.Commands
{
    public class DeleteCatalogoCommand : IRequest<ApiResponse<bool>>
    {
        public long catId { get; set; }
        public long usuIdReg { get; set; }


    }
}
