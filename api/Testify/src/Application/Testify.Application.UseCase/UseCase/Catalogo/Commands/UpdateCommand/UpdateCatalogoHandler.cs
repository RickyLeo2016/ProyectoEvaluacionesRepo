using AutoMapper;
using MediatR;
using Testify.Application.Interface.Interface;
using Testify.Application.UseCase.Commons.Bases;
using Testify.Utilities.Constants;
using Testify.Utilities.HelperExtensions;
using Entity = Testify.Domain.Entities;

namespace Testify.Application.UseCase.UseCase.Catalogo.Commands.UpdateCommand
{
    public class UpdateCatalogoHandler : IRequestHandler<UpdateCatalogoCommand, BaseResponse<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public UpdateCatalogoHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BaseResponse<bool>> Handle(UpdateCatalogoCommand request, CancellationToken cancellationToken)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var catalogo = _mapper.Map<Entity.Catalogo>(request);
                var parameters = catalogo.GetPropertiesWithValues();
                response.Data = await _unitOfWork.Catalogo.ExecAsync(SP.spActualizarCatalogo, parameters);
                if (response.Data)
                {
                    response.IsSucess = true;
                    response.Message = GlobalMessages.MESSAGE_UPDATE;
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


