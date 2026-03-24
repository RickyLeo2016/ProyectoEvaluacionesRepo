using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Empresa.Commands
{
    public class UpdateEmpresaHandler : IRequestHandler<UpdateEmpresaCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateEmpresaHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateEmpresaCommand request, CancellationToken cancellationToken)
        {
            var usuIdReg = long.Parse(_httpContextAccessor.HttpContext.User.FindFirst("usuIdRegistro").Value);
            var parameters = new
            {
                empId = request.empId,
                empNombre = request.empNombre,
                empRuc = request.empRuc,
                empDireccion = request.empDireccion,
                usuIdReg = usuIdReg
            };

            var result = await _unit.Empresa.ExecuteAsync(SP.spActualizarEmpresa, parameters);

            return new ApiResponse<bool>(
                data: result > 0,
                message: GlobalMessages.MESSAGE_UPDATE,
                isSuccess: result > 0
            );
        }
    }
}
