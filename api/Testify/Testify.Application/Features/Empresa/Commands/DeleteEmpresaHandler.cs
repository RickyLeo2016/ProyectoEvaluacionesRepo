using MediatR;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Empresa.Commands
{
    public class DeleteEmpresaHandler : IRequestHandler<DeleteEmpresaCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;

        public DeleteEmpresaHandler(IUnitOfWork unitOfWork)
        {
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(DeleteEmpresaCommand request, CancellationToken cancellationToken)
        {
            var parameters = new
            {
                empId = request.empId,
                usuIdReg = request.usuIdReg
            };

            var resultRows = await _unit.Empresa.ExecuteAsync(SP.spEliminarEmpresa, parameters);

            if (resultRows == 0)
            {
                return new ApiResponse<bool>(false, GlobalMessages.MESSAGE_DELETE_ERROR);
            }

            return new ApiResponse<bool>(
                data: resultRows > 0,
                message: GlobalMessages.MESSAGE_DELETE,
                isSuccess: resultRows > 0
            );




        }
    }
}
