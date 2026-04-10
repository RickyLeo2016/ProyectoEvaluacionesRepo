using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Menu.Commands
{
    public class UpdateMenuHandler : IRequestHandler<UpdateMenuCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateMenuHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateMenuCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;

                var parameters = new
                {
                    menId = request.menId,
                    menNombre = request.menNombre,
                    menIcono = request.menIcono,
                    menRuta = request.menRuta,
                    menPadreId = request.menPadreId,
                    menOrden = request.menOrden,
                    usuIdReg = usuIdReg
                };

                var result = await _unit.Menu.QuerySingleAsync<SpResponse<long>>(SP.spActualizarMenu, parameters);

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