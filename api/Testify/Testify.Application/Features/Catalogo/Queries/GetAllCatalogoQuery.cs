using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Catalogo.Queries
{
    public class GetAllCatalogoQuery : IRequest<PagedResponse<IEnumerable<CatalogoDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}
