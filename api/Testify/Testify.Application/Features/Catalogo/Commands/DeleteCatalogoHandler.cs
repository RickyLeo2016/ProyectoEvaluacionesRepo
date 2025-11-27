using MediatR;
using Testify.Application.Common;
using Testify.Application.Features.TipoCatalogo.Commands;
using Testify.Application.Interfaces;
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
            // Ejecuta el SP de eliminación
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
                return new ApiResponse<bool>(false, "No se encontró el registro o no se pudo eliminar.");
            }

            return new ApiResponse<bool>(true, "Registro eliminado correctamente.");
        }
    }
}
