using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.Empresa.Queries
{
    public class GetAllEmpresaHandler : IRequestHandler<GetAllEmpresaQuery, PagedResponse<IEnumerable<EmpresaDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetAllEmpresaHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<EmpresaDto>>> Handle(GetAllEmpresaQuery request,
            CancellationToken cancellationToken)
        {
            var result = await _unit.Empresa.GetAllPaginatedAsync(request.PageNumber, request.PageSize);
            var totalCount = result.Count();
            var dto = result.Select(x => new EmpresaDto
            {
                empId = x.empId,
                empNombre = x.empNombre,
                empDireccion = x.empDireccion,
                empRuc = x.empRuc,
                empEstadoDesc = x.empEstadoDesc,
                empFechaReg = x.empFechaReg
            });

            return new PagedResponse<IEnumerable<EmpresaDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalCount
            );
        }
    }
}
