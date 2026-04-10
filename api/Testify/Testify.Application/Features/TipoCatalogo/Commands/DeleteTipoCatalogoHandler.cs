using MediatR;
using Microsoft.AspNetCore.Http;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class DeleteTipoCatalogoHandler : IRequestHandler<DeleteTipoCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteTipoCatalogoHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(DeleteTipoCatalogoCommand request, CancellationToken cancellationToken)
        {
            var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
            var rows = await _unit.TipoCatalogo.ExecuteAsync(
                SP.spEliminarTipoCatalogo,
                new { 
                    TipCatId = request.tipCatId,
                    UsuIdReg = usuIdReg
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
