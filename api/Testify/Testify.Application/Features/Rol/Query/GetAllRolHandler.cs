using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.Rol.Query
{
    public class GetAllRolHandler : IRequestHandler<GetAllRolQuery, PagedResponse<IEnumerable<RolDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetAllRolHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<RolDto>>> Handle(GetAllRolQuery request,
            CancellationToken cancellationToken)
        {
            var result = await _unit.Rol.GetAllPaginatedAsync(request.PageNumber, request.PageSize);
            var totalCount = result.Count();
            var dto = result.Select(x => new RolDto
            {
                rolId = x.rolId,
                rolNombre = x.rolNombre,
                rolEstadoDesc = x.rolEstadoDesc
            });

            return new PagedResponse<IEnumerable<RolDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalCount
            );
        }
    }
}