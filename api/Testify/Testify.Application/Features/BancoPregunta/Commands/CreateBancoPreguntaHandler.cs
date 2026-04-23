using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.BancoPregunta.Commands
{
    public class CreateBancoPreguntaHandler : IRequestHandler<CreateBancoPreguntaCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateBancoPreguntaHandler(
            IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(CreateBancoPreguntaCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = _httpContextAccessor?
                    .HttpContext?
                    .User?
                    .FindFirst("usuIdRegistro")?.Value;

                var empId = _httpContextAccessor?
                   .HttpContext?
                   .User?
                   .FindFirst("empId")?.Value;

                var parameters = new
                {
                    empId = empId,
                    catIdTipo = request.catIdTipo,
                    banPreVerPuntaje = request.banPreVerPuntaje,
                    banPreVerEnunciado = request.banPreVerEnunciado,
                    banPreVerDataSchema = request.banPreVerDataSchema,
                    banPreVerUiSchema = request.banPreVerUiSchema,
                    usuId = usuIdReg
                };

                var result = await _unit.BancoPregunta
                    .QuerySingleAsync<SpResponse<long>>(
                        SP.spCrearBancoPregunta,
                        parameters
                    );
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
                return new ApiResponse<bool>(
                    false,
                    $"Error de base de datos: {ex.Message}",
                    false
                );
            }
            catch (Exception ex)
            {
                return new ApiResponse<bool>(
                    false,
                    $"Error inesperado: {ex.Message}",
                    false
                );
            }
        }
    }
}