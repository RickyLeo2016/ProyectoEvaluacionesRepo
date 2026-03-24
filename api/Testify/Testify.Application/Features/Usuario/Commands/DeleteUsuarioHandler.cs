using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Features.Usuario.Commands;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Usuario.Commands
{
    public class DeleteUsuarioHandler : IRequestHandler<DeleteUsuarioCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteUsuarioHandler(IUnitOfWork unit,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unit;
        }


        public async Task<ApiResponse<bool>> Handle(DeleteUsuarioCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = long.Parse(_httpContextAccessor.HttpContext.User.FindFirst("usuIdRegistro").Value);
                var parameters = new
                {
                    usuId = request.usuId,
                    usuIdReg = usuIdReg
                };
                var result = await _unit.Usuario.QuerySingleAsync<SpResponse<long>>(SP.spEliminarUsuario, parameters);
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

