using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Empresa.Queries
{
    public class GetAllEmpresaQuery : IRequest<PagedResponse<IEnumerable<EmpresaDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}
