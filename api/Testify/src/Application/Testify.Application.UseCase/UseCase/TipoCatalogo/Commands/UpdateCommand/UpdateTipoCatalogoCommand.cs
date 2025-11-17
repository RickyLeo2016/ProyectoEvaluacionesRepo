using Testify.Application.UseCase.Commons.Bases;
using MediatR;
namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.UpdateCommand
{
    public class UpdateTipoCatalogoCommand : IRequest<BaseResponse<bool>>
    {
        public int? tipCatId { get; set; }
        public string? tipCatDescripcion { get; set; }
        public string? tipCatEstado { get; set; }
    }
}
