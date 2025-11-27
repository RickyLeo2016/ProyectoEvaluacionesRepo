using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class DeleteTipoCatalogoCommand : IRequest<ApiResponse<bool>>
    {
        public long tipCatId { get; set; }
        public long usuIdReg { get; set; }
    }
}
