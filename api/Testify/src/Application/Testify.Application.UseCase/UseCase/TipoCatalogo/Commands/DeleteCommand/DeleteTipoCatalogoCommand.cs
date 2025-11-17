using Testify.Application.UseCase.Commons.Bases;
using MediatR;
namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.DeleteCommand
{
    public class DeleteTipoCatalogoCommand : IRequest<BaseResponse<bool>>
    {
        public int? tipCatId { get; set; }
    }
}
