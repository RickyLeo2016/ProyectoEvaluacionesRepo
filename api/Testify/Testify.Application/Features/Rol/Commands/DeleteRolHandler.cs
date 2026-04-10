using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Rol.Commands
{
    public class DeleteRolHandler : IRequestHandler<DeleteRolCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteRolHandler(IUnitOfWork unit,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unit;
        }


        public async Task<ApiResponse<bool>> Handle(DeleteRolCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
                var parameters = new
                {
                    rolId = request.rolId,
                    usuIdReg = usuIdReg
                };
                var result = await _unit.Rol.QuerySingleAsync<SpResponse<long>>(SP.spEliminarRol, parameters);
                if (result == null)
                {
                    return new ApiResponse<bool>(false, "No se obtuvo respuesta del servidor");
                }

                if (result.Codigo != "0000")
                {
                    return new ApiResponse<bool>(false, result.Mensaje);
                }

                return new ApiResponse<bool>(true, result.Mensaje);
            }
            catch (SqlException ex)
            {
                return new ApiResponse<bool>(false, $"Error de base de datos: {ex.Message}", false);
            }
            catch (Exception ex)
            {
                return new ApiResponse<bool>(false, $"Error inesperado: {ex.Message}", false);
            }
        }
    }
}
