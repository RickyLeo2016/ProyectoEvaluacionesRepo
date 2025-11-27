using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Catalogo.Queries
{
    public class GetCatalogoByIdQuery : IRequest<ApiResponse<CatalogoDto>>
    {
        public long catId { get; set; }
    }
}
