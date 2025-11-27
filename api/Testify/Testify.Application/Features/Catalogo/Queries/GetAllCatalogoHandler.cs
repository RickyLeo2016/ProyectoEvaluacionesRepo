using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Features.Catalogo.Queries;
using Testify.Application.Features.TipoCatalogo.Queries;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.Catalogo.Queries
{
    public class GetAllCatalogoHandler : IRequestHandler<GetAllCatalogoQuery, PagedResponse<IEnumerable<CatalogoDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetAllCatalogoHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }


        public async Task<PagedResponse<IEnumerable<CatalogoDto>>> Handle(GetAllCatalogoQuery request,
            CancellationToken cancellationToken)
        {
            var result = await _unit.Catalogo.GetAllPaginatedAsync(request.PageNumber, request.PageSize);
            var totalCount = result.Count();
            var dto = result.Select(x => new CatalogoDto
            {
                catId = x.catId,
                tipCatId = x.tipCatId,
                tipCatDescripcion = x.tipCatDescripcion,
                catNombre = x.catNombre,
                catDescripcion = x.catDescripcion,
                catEstado = x.catEstado,
                usuIdReg = x.usuIdReg,
                catFechaReg = x.catFechaReg
            });

            return new PagedResponse<IEnumerable<CatalogoDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalCount
            );
        }
    }
}
