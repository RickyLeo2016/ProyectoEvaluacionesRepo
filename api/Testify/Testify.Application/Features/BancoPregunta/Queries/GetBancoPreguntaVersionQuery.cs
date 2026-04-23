using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.BancoPregunta.Queries
{
    public class GetBancoPreguntaVersionQuery : IRequest<PagedResponse<IEnumerable<BancoPreguntaVersionDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}