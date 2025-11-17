using Testify.Application.UseCase.Commons.Bases;
using MediatR;

namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.CreateCommand
{
    public class CreateTipoCatalogoCommand : IRequest<BaseResponse<bool>>
    {
        public string? tipCatDescripcion { get; set; }
        public string? tipCatEstado { get; set; }
        public int? usuIdReg { get; set; } = 0;
    }
}
