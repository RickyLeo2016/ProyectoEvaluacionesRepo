using MediatR;
using Microsoft.AspNetCore.Http;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Catalogo.Commands
{
    public class UpdateCatalogoHandler : IRequestHandler<UpdateCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateCatalogoHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateCatalogoCommand request, CancellationToken cancellationToken)
        {

            var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
            var parameters = new
            {
                catId = request.catId,
                tipCatId = request.tipCatId,
                catNombre = request.catNombre,
                catDescripcion = request.catDescripcion,
                catEstado = request.catEstado,
                usuIdReg = usuIdReg
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
