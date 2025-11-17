using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Application.UseCase.Commons.Bases;
using MediatR;
namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Queries.GetAllTipoCatalogo
{
    public class GetAllTipoCatalogoQuery : IRequest<BasePaginationResponse<IEnumerable<GetAllTipoCatalogoResponseDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 100;
    }
}
