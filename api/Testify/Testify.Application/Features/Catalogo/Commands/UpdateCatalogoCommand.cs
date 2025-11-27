using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Catalogo.Commands
{
    public class UpdateCatalogoCommand : IRequest<ApiResponse<bool>>
    {
        public long? catId { get; init; }
        public long? tipCatId { get; init; }
        public string? catNombre { get; init; } = string.Empty;
        public string? catDescripcion { get; init; } = string.Empty;
        public string? catEstado { get; init; } = "A";
        public int? usuIdReg { get; init; }


    }
}
