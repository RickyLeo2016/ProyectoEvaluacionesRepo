using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Features.TipoCatalogo.Commands;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Empresa.Commands
{
    public class CreateEmpresaHandler : IRequestHandler<CreateEmpresaCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;

        public CreateEmpresaHandler(IUnitOfWork unitOfWork)
        {
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(CreateEmpresaCommand request, CancellationToken cancellationToken)
        {
            var parameters = new
            {
                empNombre = request.empNombre,
                empRuc = request.empRuc,
                empDireccion = request.empDireccion,
                empEstado = request.empEstado,
                usuIdReg = request.usuIdReg
            };

            var result = await _unit.Empresa.ExecuteAsync(SP.spCrearEmpresa, parameters);

            return new ApiResponse<bool>(
                data: result > 0,
                message: GlobalMessages.MESSAGE_SAVE,
                isSuccess: result > 0
            );
        }
    }
}
