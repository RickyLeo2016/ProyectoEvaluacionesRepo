using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Menu.Commands
{
    public class UpdateMenuCommand : IRequest<ApiResponse<bool>>
    {
        public long? menId { get; init; }
        public string? menNombre { get; init; } = string.Empty;
        public string? menIcono { get; init; } = string.Empty;
        public string? menRuta { get; init; } = string.Empty;
        public long? menPadreId { get; init; }
        public long? menOrden { get; init; }
    }
}
