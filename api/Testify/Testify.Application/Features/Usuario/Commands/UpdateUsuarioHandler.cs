using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Usuario.Commands
{
    public class UpdateUsuarioHandler : IRequestHandler<UpdateUsuarioCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateUsuarioHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateUsuarioCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;

                var parameters = new
                {
                    usuId = request.usuId,
                    usuEmail = request.usuEmail,
                    empId = request.empId,
                    usuNombres = request.usuNombres,
                    usuApellidos = request.usuApellidos,
                    usuTelefono = request.usuTelefono,
                    usuCelular = request.usuCelular,
                    usuIdReg = usuIdReg
                };

                var result = await _unit.Usuario.QuerySingleAsync<SpResponse<long>>(SP.spActualizarUsuario, parameters);

                if (result.Codigo == "0000")
                {
                    return new ApiResponse<bool>(true, result.Mensaje, true);
                }
                else
                {
                    return new ApiResponse<bool>(false, result.Mensaje, false);
                }
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
