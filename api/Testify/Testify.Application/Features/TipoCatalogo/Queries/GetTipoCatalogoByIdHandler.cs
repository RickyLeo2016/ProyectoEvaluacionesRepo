using MediatR;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.TipoCatalogo.Queries
{
    public class GetTipoCatalogoByIdHandler
        : IRequestHandler<GetTipoCatalogoByIdQuery, ApiResponse<TipoCatalogoDto>>
    {
        private readonly IUnitOfWork _unit;

        public GetTipoCatalogoByIdHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public async Task<ApiResponse<TipoCatalogoDto>> Handle(GetTipoCatalogoByIdQuery request, CancellationToken cancellationToken)
        {
            // 1) Obtener desde BD
            var result = await _unit.TipoCatalogo.GetByIdAsync(
                SP.spListarPorIdTipoCatalogo,
                new { TipCatId = request.tipCatId }
            );

            // 2) Validar si existe
            if (result == null)
            {
                return new ApiResponse<TipoCatalogoDto>(null, "No se encontró el registro.", false);
            }

            // 3) Mapear a DTO
            var dto = new TipoCatalogoDto
            {
                tipCatId = result.tipCatId,
                tipCatDescripcion = result.tipCatDescripcion,
                tipCatEstado = result.tipCatEstado,
                UsuIdReg = result.UsuIdReg,
                tipCatFechaRegistro = result.tipCatFechaRegistro
            };

            return new ApiResponse<TipoCatalogoDto>(dto, "Consulta exitosa.");
        }
    }
}
