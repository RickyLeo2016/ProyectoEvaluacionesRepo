using MediatR;
using Microsoft.AspNetCore.Http;
using Testify.Application.Common;
using Testify.Application.Features.TipoCatalogo.Commands;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Catalogo.Commands
{
    public class DeleteCatalogoHandler : IRequestHandler<DeleteCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteCatalogoHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(DeleteCatalogoCommand request, CancellationToken cancellationToken)
        {
            var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
            var rows = await _unit.Catalogo.ExecuteAsync(
                SP.spEliminarCatalogo,
                new
                {
                    catId = request.catId,
                    usuIdReg = usuIdReg
                }
            );

            if (rows == 0)
            {
                return new ApiResponse<bool>(false, GlobalMessages.MESSAGE_DELETE_ERROR);
            }

            return new ApiResponse<bool>(true, GlobalMessages.MESSAGE_DELETE);
        }
    }
}
