using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.Usuario.Queries
{
    public class GetAllUsuarioHandler : IRequestHandler<GetAllUsuarioQuery, PagedResponse<IEnumerable<UsuarioDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetAllUsuarioHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<UsuarioDto>>> Handle(GetAllUsuarioQuery request,
            CancellationToken cancellationToken)
        {
            var result = await _unit.Usuario.GetAllPaginatedAsync(request.PageNumber, request.PageSize);
            var totalCount = result.Count();
            var dto = result.Select(x => new UsuarioDto
            {
                usuId = x.usuId,
                empId = x.empId,
                empNombre = x.empNombre,
                usuEmail = x.usuEmail,
                usuDetDNI = x.usuDetDNI,
                usuNombre = x.usuNombre,
                usuNombres = x.usuNombres,
                usuApellidos = x.usuApellidos,
                usuTelefono = x.usuTelefono,
                usuCelular = x.usuCelular,
                catIdEstado = x.catIdEstado,
                usuEstadoDesc = x.usuEstadoDesc,
                usuIdReg = x.usuIdReg,
                usuFechaReg = x.usuFechaReg
            });

            return new PagedResponse<IEnumerable<UsuarioDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalCount
            );
        }
    }
}