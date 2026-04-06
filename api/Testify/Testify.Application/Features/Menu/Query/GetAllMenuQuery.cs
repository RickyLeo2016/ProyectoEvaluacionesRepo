using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Menu.Query
{
    public class GetAllMenuQuery : IRequest<PagedResponse<IEnumerable<MenuDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}
