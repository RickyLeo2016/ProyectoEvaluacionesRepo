using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.Menu.Query
{
    public class GetMenuRolHandler : IRequestHandler<GetMenuRolQuery, PagedResponse<IEnumerable<MenuDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetMenuRolHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<MenuDto>>> Handle(GetMenuRolQuery request,
            CancellationToken cancellationToken)
        {
            var result = await _unit.Menu.GetMenuRolPaginatedAsync(request.rolId, request.PageNumber, request.PageSize);
            
            var totalCount = result.Count();
            var dto = result.Select(x => new MenuDto
            {
                menId = x.menId,
                menNombre = x.menNombre,
                menRuta = x.menRuta,
                menIcono = x.menIcono,
                menPadreId = x.menPadreId,
                menOrden = x.menOrden,
                menEstadoDesc = x.menEstadoDesc,
                esPadre = x.esPadre,
                menSelec = x.menSelec
            });

            return new PagedResponse<IEnumerable<MenuDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalCount
            );
        }
    }
}