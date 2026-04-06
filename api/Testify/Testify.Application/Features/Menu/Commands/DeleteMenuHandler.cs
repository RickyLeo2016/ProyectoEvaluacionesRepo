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
    public class DeleteMenuHandler : IRequestHandler<DeleteMenuCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteMenuHandler(IUnitOfWork unit,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unit;
        }


        public async Task<ApiResponse<bool>> Handle(DeleteMenuCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = long.Parse(_httpContextAccessor.HttpContext.User.FindFirst("usuIdRegistro").Value);
                var parameters = new
                {
                    menId = request.menId,
                    usuIdReg = usuIdReg
                };
                var result = await _unit.Menu.QuerySingleAsync<SpResponse<long>>(SP.spEliminarMenu, parameters);
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
