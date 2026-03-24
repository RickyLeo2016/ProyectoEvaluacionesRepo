using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Usuario.Queries
{
    public class GetAllUsuarioQuery : IRequest<PagedResponse<IEnumerable<UsuarioDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}
