using MediatR;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class UpdateTipoCatalogoHandler : IRequestHandler<UpdateTipoCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;

        public UpdateTipoCatalogoHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateTipoCatalogoCommand request, CancellationToken cancellationToken)
        {
            var rowsAffected = await _unit.TipoCatalogo.ExecuteAsync(
                SP.spActualizarTipoCatalogo,
                new
                {
                    TipCatId = request.tipCatId,
                    TipCatDescripcion = request.tipCatDescripcion,
                    TipCatEstado = request.tipCatEstado,
                    UsuIdReg = request.usuIdReg
                }
            );

            if (rowsAffected > 0)
            {
                return new ApiResponse<bool>(
                    true,
                     GlobalMessages.MESSAGE_UPDATE,
                    true
                );
            }
            else
            {
                return new ApiResponse<bool>(
                    false,
                    GlobalMessages.MESSAGE_UPDATE_ERROR,
                    false
                );
            }
        }
    }
}
