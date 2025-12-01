using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Empresa.Queries
{
    public class GetEmpresaByIdHandler : IRequestHandler<GetEmpresaByIdQuery, ApiResponse<EmpresaDto>>
    {
        private readonly IUnitOfWork _unit;

        public GetEmpresaByIdHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public async Task<ApiResponse<EmpresaDto>> Handle(GetEmpresaByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _unit.Empresa.GetByIdAsync(
                SP.spListarEmpresaPorId,
                new { 
                    empId = request.empId 
                }
            );
            if (result == null)
                return new ApiResponse<EmpresaDto>(null, GlobalMessages.MESSAGE_QUERY_EMPTY, false);

            var dto = new EmpresaDto
            {
                empId = result.empId,
                empNombre = result.empNombre
            };

            return new ApiResponse<EmpresaDto>(dto, GlobalMessages.MESSAGE_QUERY);
        }
    }
}
