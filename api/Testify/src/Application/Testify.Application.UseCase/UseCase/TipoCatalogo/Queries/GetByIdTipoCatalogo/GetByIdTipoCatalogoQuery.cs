using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Application.UseCase.Commons.Bases;
using MediatR;
namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Queries.GetByIdTipoCatalogo
{
    public class GetByIdTipoCatalogoQuery : IRequest<BaseResponse<GetByIdTipoCatalogoResponseDto>>
    {
        public int tipCatId { get; set; }
    }
}
