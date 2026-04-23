using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.BancoPregunta.Commands
{
    public class CreateBancoPreguntaVersionHandler : IRequestHandler<CreateBancoPreguntaVersionCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateBancoPreguntaVersionHandler(
            IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _unit = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ApiResponse<bool>> Handle(CreateBancoPreguntaVersionCommand request, CancellationToken cancellationToken)
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
                    banPreId = request.banPreId,
                    catIdTipo = request.catIdTipo,
                    banPrePuntajeMax = request.puntaje,
                    enunciado = request.enunciado,
                    dataSchema = request.dataSchema,
                    uiSchema = request.uiSchema,
                    usuId = usuIdReg
                };

                var result = await _unit.BancoPregunta
                    .QuerySingleAsync<SpResponse<int>>(
                        SP.spCrearBancoPreguntaVersion,
                        parameters
                    );

                if (result.Codigo == "0000")
                {
                    return new ApiResponse<bool>(
                        true,
                        result.Mensaje,
                        true
                    );
                }

                return new ApiResponse<bool>(
                    false,
                    result.Mensaje,
                    false
                );
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