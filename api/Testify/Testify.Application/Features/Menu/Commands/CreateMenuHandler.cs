using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Features.Menu.Commands;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Menu.Commands
{
    public class CreateMenuHandler : IRequestHandler<CreateMenuCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateMenuHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(CreateMenuCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
                //var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
                var parameters = new
                {
                    menNombre = request.menNombre,
                    menIcono = request.menIcono,
                    menRuta = request.menRuta,
                    menPadreId = request.menPadreId,
                    menOrden = request.menOrden,
                    usuIdReg = usuIdReg
                };

                var result = await _unit.Menu.QuerySingleAsync<SpResponse<long>>(SP.spCrearMenu, parameters);

                if (result.Codigo == "0000")
                {
                    return new ApiResponse<bool>(
                        data: true,
                        message: result.Mensaje,
                        isSuccess: true
                    );
                }
                else
                {
                    return new ApiResponse<bool>(
                       data: false,
                       message: result.Mensaje,
                       isSuccess: false
                   );
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
