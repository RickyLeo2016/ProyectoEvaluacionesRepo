using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Features.TipoCatalogo.Queries;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Catalogo.Queries
{
    public class GetCatalogoByIdHandler : IRequestHandler<GetCatalogoByIdQuery, ApiResponse<CatalogoDto>>
    {
        private readonly IUnitOfWork _unit;

        public GetCatalogoByIdHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public async Task<ApiResponse<CatalogoDto>> Handle(GetCatalogoByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _unit.Catalogo.GetByIdAsync(
                SP.spListarCatalogoPorId,
                new { catId = request.catId }
            );
            if (result == null)
                return new ApiResponse<CatalogoDto>(null, "No se encontró el registro.", false);

            var dto = new CatalogoDto
            {
                catId = result.catId,
                catNombre = result.catNombre,
                catEstado = result.catEstado
            };

            return new ApiResponse<CatalogoDto>(dto, "Consulta exitosa.");
        }
    }
}
