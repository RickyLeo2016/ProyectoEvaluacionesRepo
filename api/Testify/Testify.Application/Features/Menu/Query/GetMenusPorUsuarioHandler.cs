using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.Menu.Query
{
    public class GetMenusPorUsuarioHandler : IRequestHandler<GetMenusPorUsuarioQuery, PagedResponse<IEnumerable<MenuDto>>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetMenusPorUsuarioHandler(
            IUnitOfWork unit,
            IHttpContextAccessor httpContextAccessor
            
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<MenuDto>>> Handle(GetMenusPorUsuarioQuery request,CancellationToken cancellationToken)
        {

            var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;

            if (string.IsNullOrEmpty(usuIdReg))
                throw new UnauthorizedAccessException("No se encontró el usuario en el token");

            var result = await _unit.Menu.GetMenuPorUsuarioPaginatedAsync(
                Int64.Parse(usuIdReg),
                request.PageNumber,
                request.PageSize
            );

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
                result.Count()
            );
        }
    }
}