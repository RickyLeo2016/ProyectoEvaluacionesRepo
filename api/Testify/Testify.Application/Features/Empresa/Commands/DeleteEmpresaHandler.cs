using MediatR;
using Microsoft.AspNetCore.Http;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;

namespace Testify.Application.Features.Empresa.Commands
{
    public class DeleteEmpresaHandler : IRequestHandler<DeleteEmpresaCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteEmpresaHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(DeleteEmpresaCommand request, CancellationToken cancellationToken)
        {
            var usuIdReg = long.Parse(_httpContextAccessor.HttpContext.User.FindFirst("usuIdRegistro").Value);
            var parameters = new
            {
                empId = request.empId,
                usuIdReg = usuIdReg
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
