using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Features.TipoCatalogo.Queries;
using Testify.Application.Interfaces;

public class GetAllTipoCatalogoHandler
    : IRequestHandler<GetAllTipoCatalogoQuery, PagedResponse<IEnumerable<TipoCatalogoDto>>>
{
    private readonly IUnitOfWork _unit;

    public GetAllTipoCatalogoHandler(IUnitOfWork unit)
    {
        _unit = unit;
    }

    public async Task<PagedResponse<IEnumerable<TipoCatalogoDto>>> Handle(
        GetAllTipoCatalogoQuery request, CancellationToken cancellationToken)
    {
        var result = await _unit.TipoCatalogo
            .GetAllPaginatedAsync(request.PageNumber, request.PageSize);

        var totalCount = result.Count();

        var dto = result.Select(x => new TipoCatalogoDto
        {
            tipCatId = x.tipCatId,
            tipCatDescripcion = x.tipCatDescripcion,
            tipCatEstado = x.tipCatEstado,
            UsuIdReg = x.UsuIdReg,
            tipCatFechaRegistro = x.tipCatFechaRegistro
        });

        return new PagedResponse<IEnumerable<TipoCatalogoDto>>(
            dto,
            request.PageNumber,
            request.PageSize,
            totalCount
        );
    }
}
