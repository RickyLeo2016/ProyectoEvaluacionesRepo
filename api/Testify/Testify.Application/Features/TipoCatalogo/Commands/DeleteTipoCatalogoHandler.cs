using MediatR;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class DeleteTipoCatalogoHandler : IRequestHandler<DeleteTipoCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;

        public DeleteTipoCatalogoHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public async Task<ApiResponse<bool>> Handle(DeleteTipoCatalogoCommand request, CancellationToken cancellationToken)
        {
            // Ejecuta el SP de eliminación
            var rows = await _unit.TipoCatalogo.ExecuteAsync(
                SP.spEliminarTipoCatalogo,
                new { 
                    TipCatId = request.tipCatId,
                    UsuIdReg = request.usuIdReg
                }
            );

            if (rows == 0)
            {
                return new ApiResponse<bool>(false, GlobalMessages.MESSAGE_DELETE_ERROR);
            }

            return new ApiResponse<bool>(true, GlobalMessages.MESSAGE_SAVE);
        }
    }
}
