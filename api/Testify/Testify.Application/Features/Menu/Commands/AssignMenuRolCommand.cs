using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Menu.Commands
{
    public class AssignMenuRolCommand : IRequest<ApiResponse<bool>>
    {
        public long rolId { get; set; }
        public List<AssignMenuRolDto>? menus { get; set; }
    }
}
