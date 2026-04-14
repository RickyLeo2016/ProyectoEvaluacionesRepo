using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Xml.Linq;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Menu.Commands
{
    public class AssignMenuRolHandler : IRequestHandler<AssignMenuRolCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AssignMenuRolHandler(
            IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _unit = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ApiResponse<bool>> Handle(AssignMenuRolCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
                var xml = GenerarXml(request.rolId, request.menus);

                var parameters = new
                {
                    rolId = request.rolId,
                    xmlDatos = xml,
                    usuIdReg = usuIdReg
                };

                var result = await _unit.Menu.QuerySingleAsync<SpResponse<int>>(SP.spAsignarMenuRol, parameters);

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

        private string GenerarXml(long rolId, List<AssignMenuRolDto> menus)
        {
            var xml = new XElement("Datos",
                menus.Select(r =>
                    new XElement("RolesMenu",
                        new XElement("rolId", rolId),
                        new XElement("menId", r.menId),
                        new XElement("menSelec", r.menSelec)
                    )
                )
            );

            return xml.ToString();
        }
    }
}
