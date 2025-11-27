using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.TipoCatalogo.Queries
{
    public class GetTipoCatalogoByIdQuery : IRequest<ApiResponse<TipoCatalogoDto>>
    {
        public long tipCatId { get; set; }
    }
}
