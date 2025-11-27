using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class CreateTipoCatalogoCommand: IRequest<ApiResponse<bool>>
    {
        public string tipCatDescripcion { get; set; } = string.Empty;
        public string tipCatEstado { get; set; } = "A";
        public int usuIdReg { get; set; }
    }

}
