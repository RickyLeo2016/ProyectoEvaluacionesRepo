using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.UsuarioRol.Commands
{
    public class AssignUsuarioRolHandler : IRequestHandler<AssignUsuarioRolCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AssignUsuarioRolHandler(
            IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _unit = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ApiResponse<bool>> Handle(AssignUsuarioRolCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = long.Parse(
                    _httpContextAccessor.HttpContext.User.FindFirst("usuIdRegistro").Value
                );

                var xml = GenerarXml(request.usuId, request.roles);

                var parameters = new
                {
                    usuId = request.usuId,
                    xmlDatos = xml,
                    usuIdReg = usuIdReg
                };

                var result = await _unit.UsuarioRol.QuerySingleAsync<SpResponse<int>>(SP.spAsignarRol, parameters);

                if (result.Codigo == "0000")
                {
                    return new ApiResponse<bool>(
                        data: true,
                        message: result.Mensaje,
                        isSuccess: true
                    );
                }

                return new ApiResponse<bool>(
                    data: false,
                    message: result.Mensaje,
                    isSuccess: false
                );
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

        private string GenerarXml(long usuId, List<AssignUsuarioRolDto> roles)
        {
            var xml = new XElement("Datos",
                roles.Select(r =>
                    new XElement("Roles",
                        new XElement("usuId", usuId),
                        new XElement("rolId", r.rolId),
                        new XElement("rolSelec", r.rolSelec)
                    )
                )
            );

            return xml.ToString();
        }
    }
}
