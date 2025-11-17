using AutoMapper;
using MediatR;
using Testify.Application.Interface.Interface;
using Testify.Application.UseCase.Commons.Bases;
using Testify.Utilities.Constants;
using Testify.Utilities.HelperExtensions;
using Entity = Testify.Domain.Entities;

namespace Testify.Application.UseCase.UseCase.Catalogo.Commands.CreateCommand
{
    public class CreateCatalogoHandler : IRequestHandler<CreateCatalogoCommand, BaseResponse<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public CreateCatalogoHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BaseResponse<bool>> Handle(CreateCatalogoCommand request, CancellationToken cancellationToken)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var catalogo = _mapper.Map<Entity.Catalogo>(request);
                var parameters = catalogo.GetPropertiesWithValues();
                response.Data = await _unitOfWork.Catalogo.ExecAsync(SP.spCrearCatalogo, parameters);
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


