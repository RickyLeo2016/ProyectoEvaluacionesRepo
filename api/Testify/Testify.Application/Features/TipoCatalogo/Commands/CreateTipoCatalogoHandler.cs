using MediatR;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;


namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class CreateTipoCatalogoHandler : IRequestHandler<CreateTipoCatalogoCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;

        public CreateTipoCatalogoHandler(IUnitOfWork unitOfWork)
        {
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(CreateTipoCatalogoCommand request,CancellationToken cancellationToken)
        {
            var parameters = new
            {
                tipCatDescripcion = request.tipCatDescripcion,
                tipCatEstado = request.tipCatEstado,
                UsuIdReg = request.usuIdReg
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
