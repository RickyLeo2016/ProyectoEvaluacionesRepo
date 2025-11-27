using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Catalogo.Commands
{
    public class CreateCatalogoHandler : IRequestHandler<CreateCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        public CreateCatalogoHandler( IUnitOfWork unitOfWork)
        {
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(CreateCatalogoCommand request, CancellationToken cancellationToken)
        {
            var parameters = new
            {
                tipCatId = request.tipCatId,
                catNombre = request.catNombre,
                catDescripcion = request.catDescripcion,
                catEstado = request.catEstado,
                usuIdReg = request.usuIdReg
            };

            var result = await _unit.Catalogo.ExecuteAsync(SP.spCrearCatalogo, parameters);

            return new ApiResponse<bool>(
                data: result > 0,
                message: GlobalMessages.MESSAGE_SAVE,
                isSuccess: result > 0
            );
        }
    }
}
