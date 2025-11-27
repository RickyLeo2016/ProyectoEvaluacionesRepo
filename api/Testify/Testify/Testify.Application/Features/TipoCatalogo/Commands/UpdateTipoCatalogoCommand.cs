using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class UpdateTipoCatalogoCommand : IRequest<ApiResponse<bool>>
    {
        public int tipCatId { get; set; }
        public string tipCatDescripcion { get; set; } = string.Empty;
        public string tipCatEstado { get; set; } = string.Empty;
        public int usuIdReg { get; set; } = 0;
    }
}
