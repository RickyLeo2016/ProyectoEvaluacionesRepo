using AutoMapper;
using Testify.Application.Interface.Interface;
using Testify.Application.UseCase.Commons.Bases;
using Testify.Utilities.Constants;
using Testify.Utilities.HelperExtensions;
using MediatR;
using Entity = Testify.Domain.Entities;
//using Testify.Utilities.Constants.Testify.Utilities.Constants;

namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.DeleteCommand
{
    public class DeleteTipoCatalogoHandler : IRequestHandler<DeleteTipoCatalogoCommand, BaseResponse<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DeleteTipoCatalogoHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        public async Task<BaseResponse<bool>> Handle(DeleteTipoCatalogoCommand request, CancellationToken cancellationToken)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var tipoCatalogo = _mapper.Map<Entity.TipoCatalogo>(request);
                var parameters = tipoCatalogo.GetPropertiesWithValues();

                response.Data = await _unitOfWork.TipoCatalogo.ExecAsync(SP.spEliminarTipoCatalogo, parameters);
                if (response.Data)
                {
                    response.IsSucess = true;
                    response.Message = GlobalMessages.MESSAGE_DELETE;
                }
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
