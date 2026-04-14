using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Menu.Query
{
    public class GetMenusPorUsuarioQuery : IRequest<PagedResponse<IEnumerable<MenuDto>>>
    {

        public long usuId{ get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}
