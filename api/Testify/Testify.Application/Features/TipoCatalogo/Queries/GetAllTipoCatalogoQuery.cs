using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.TipoCatalogo.Queries
{
    public class GetAllTipoCatalogoQuery : IRequest<PagedResponse<IEnumerable<TipoCatalogoDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
