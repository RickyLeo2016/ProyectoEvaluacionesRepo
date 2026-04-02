using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.UsuarioRol.Queries
{
    public class GetUsuarioRolHandler : IRequestHandler<GetUsuarioRolQuery, PagedResponse<IEnumerable<UsuarioRolDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetUsuarioRolHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<UsuarioRolDto>>> Handle(GetUsuarioRolQuery request,
            CancellationToken cancellationToken)
        {
            var result = await _unit.UsuarioRol.GetUsuarioRolPaginatedAsync(request.usuId, request.PageNumber, request.PageSize);
            var totalCount = result.Count();
            var dto = result.Select(x => new UsuarioRolDto
            {
                rolId = x.rolId,
                rolNombre = x.rolNombre,
                rolSelec = x.rolSelec
            });

            return new PagedResponse<IEnumerable<UsuarioRolDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalCount
            );
        }
    }
}