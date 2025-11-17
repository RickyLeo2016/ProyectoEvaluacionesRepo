using AutoMapper;
using Testify.Application.Interface.Interface;
using Testify.Application.UseCase.Commons.Bases;
using Testify.Utilities.Constants;
using Testify.Utilities.HelperExtensions;
using MediatR;
using Entity = Testify.Domain.Entities;
//using Testify.Utilities.Constants.Testify.Utilities.Constants;

namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.CreateCommand
{
    public class CreateTipoCatalogoHandler : IRequestHandler<CreateTipoCatalogoCommand, BaseResponse<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public CreateTipoCatalogoHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BaseResponse<bool>> Handle(CreateTipoCatalogoCommand request, CancellationToken cancellationToken)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var tipoCatalogo = _mapper.Map<Entity.TipoCatalogo>(request);
                var parameters = tipoCatalogo.GetPropertiesWithValues();
                response.Data = await _unitOfWork.TipoCatalogo.ExecAsync(SP.spCrearTipoCatalogo, parameters);
                if (response.Data)
                {
                    response.IsSucess = true;
                    response.Message = GlobalMessages.MESSAGE_SAVE;
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
