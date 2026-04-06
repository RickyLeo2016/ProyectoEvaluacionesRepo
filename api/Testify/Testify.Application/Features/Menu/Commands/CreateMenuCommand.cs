using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;

namespace Testify.Application.Features.Menu.Commands
{
    public class CreateMenuCommand : IRequest<ApiResponse<bool>>
    {
        public string? menNombre { get; init; } = string.Empty;
        public string? menIcono { get; init; } = string.Empty;
        public string? menRuta { get; init; } = string.Empty;
        public long? menPadreId { get; init; }
        public long? menOrden { get; init; }

    }
}
