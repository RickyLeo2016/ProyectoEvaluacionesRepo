using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.UsuarioRol.Queries
{
    public class GetUsuarioRolQuery : IRequest<PagedResponse<IEnumerable<UsuarioRolDto>>>
    {
        public long usuId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}