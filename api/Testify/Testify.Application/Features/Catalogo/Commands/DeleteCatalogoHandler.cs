using MediatR;
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

        public DeleteCatalogoHandler(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public async Task<ApiResponse<bool>> Handle(DeleteCatalogoCommand request, CancellationToken cancellationToken)
        {
            var rows = await _unit.Catalogo.ExecuteAsync(
                SP.spEliminarCatalogo,
                new
                {
                    catId = request.catId,
                    usuIdReg = request.usuIdReg
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
