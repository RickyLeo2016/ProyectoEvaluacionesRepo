using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Empresa.Queries
{
    public class GetEmpresaByIdQuery : IRequest<ApiResponse<EmpresaDto>>
    {
        public long empId { get; set; }
    }
}
