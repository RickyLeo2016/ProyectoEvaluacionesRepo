using MediatR;
using Testify.Application.Dto.Catalogo.Response;
using Testify.Application.UseCase.Commons.Bases;

namespace Testify.Application.UseCase.UseCase.Catalogo.Queries.GetAllCatalogo
{
    public class GetAllCatalogoQuery : IRequest<BasePaginationResponse<IEnumerable<GetAllCatalogoResponseDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 100;
    }
}
