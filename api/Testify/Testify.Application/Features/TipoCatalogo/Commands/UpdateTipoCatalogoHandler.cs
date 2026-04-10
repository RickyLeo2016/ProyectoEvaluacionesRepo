using MediatR;
using Microsoft.AspNetCore.Http;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class UpdateTipoCatalogoHandler : IRequestHandler<UpdateTipoCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UpdateTipoCatalogoHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateTipoCatalogoCommand request, CancellationToken cancellationToken)
        {
            var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
            var rowsAffected = await _unit.TipoCatalogo.ExecuteAsync(
                SP.spActualizarTipoCatalogo,
                new
                {
                    TipCatId = request.tipCatId,
                    TipCatDescripcion = request.tipCatDescripcion,
                    TipCatEstado = request.tipCatEstado,
                    UsuIdReg = usuIdReg
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
