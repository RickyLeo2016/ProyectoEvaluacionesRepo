using MediatR;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Catalogo.Commands
{
    public class UpdateCatalogoHandler : IRequestHandler<UpdateCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        public UpdateCatalogoHandler(IUnitOfWork unitOfWork)
        {
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateCatalogoCommand request, CancellationToken cancellationToken)
        {
            var parameters = new
            {
                catId = request.catId,
                tipCatId = request.tipCatId,
                catNombre = request.catNombre,
                catDescripcion = request.catDescripcion,
                catEstado = request.catEstado,
                usuIdReg = request.usuIdReg
            };

            var result = await _unit.Catalogo.ExecuteAsync(SP.spActualizarCatalogo, parameters);

            return new ApiResponse<bool>(
                data: result > 0,
                message: GlobalMessages.MESSAGE_SAVE,
                isSuccess: result > 0
            );
        }
    }
}
