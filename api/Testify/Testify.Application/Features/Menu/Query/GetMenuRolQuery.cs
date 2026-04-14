using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Menu.Query
{
    public class GetMenuRolQuery : IRequest<PagedResponse<IEnumerable<MenuDto>>>
    {
        public long rolId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}
