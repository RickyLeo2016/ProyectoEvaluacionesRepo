using MediatR;
using Microsoft.AspNetCore.Http;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;


namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class CreateTipoCatalogoHandler : IRequestHandler<CreateTipoCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateTipoCatalogoHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(CreateTipoCatalogoCommand request,CancellationToken cancellationToken)
        {
            var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
            var parameters = new
            {
                tipCatDescripcion = request.tipCatDescripcion,
                tipCatEstado = request.tipCatEstado,
                UsuIdReg = usuIdReg
            };

            var result = await _unit.TipoCatalogo.ExecuteAsync(SP.spCrearTipoCatalogo, parameters);

            return new ApiResponse<bool>(
                data: result > 0,
                message: GlobalMessages.MESSAGE_SAVE,
                isSuccess: result > 0
            );
        }
    }
}
