using MediatR;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Catalogo.Queries
{
    public class GetObtenerCatalogoPorTipoHandler
       : IRequestHandler<GetObtenerCatalogoPorTipoQuery, ApiResponse<IEnumerable<CatalogoDto>>>
    {
        private readonly IUnitOfWork _unit;

        public GetObtenerCatalogoPorTipoHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public async Task<ApiResponse<IEnumerable<CatalogoDto>>> Handle(
            GetObtenerCatalogoPorTipoQuery request,
            CancellationToken cancellationToken)
        {
            try
            {
                var result = await _unit.Catalogo.QueryAsync<CatalogoDto>(
                    SP.spListarCatalogoPorTipo,
                    new { tipCatId = request.tipCatId }
                );

                if (result == null || !result.Any())
                {
                    return new ApiResponse<IEnumerable<CatalogoDto>>(
                        data: Enumerable.Empty<CatalogoDto>(),
                        message: GlobalMessages.MESSAGE_QUERY_EMPTY,
                        isSuccess: false
                    );
                }

                return new ApiResponse<IEnumerable<CatalogoDto>>(
                    data: result,
                    message: GlobalMessages.MESSAGE_QUERY,
                    isSuccess: true
                );
            }
            catch (SqlException ex)
            {
                return new ApiResponse<IEnumerable<CatalogoDto>>(
                    data: Enumerable.Empty<CatalogoDto>(),
                    message: $"Error de base de datos: {ex.Message}",
                    isSuccess: false
                );
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<CatalogoDto>>(
                    data: Enumerable.Empty<CatalogoDto>(),
                    message: $"Error inesperado: {ex.Message}",
                    isSuccess: false
                );
            }
        }
    }
}
