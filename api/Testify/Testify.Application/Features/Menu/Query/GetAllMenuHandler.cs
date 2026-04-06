using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.Menu.Query
{
    public class GetAllMenuHandler : IRequestHandler<GetAllMenuQuery, PagedResponse<IEnumerable<MenuDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetAllMenuHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<MenuDto>>> Handle(GetAllMenuQuery request,
            CancellationToken cancellationToken)
        {
            var result = await _unit.Menu.GetAllPaginatedAsync(request.PageNumber, request.PageSize);
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
                esPadre = x.esPadre
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