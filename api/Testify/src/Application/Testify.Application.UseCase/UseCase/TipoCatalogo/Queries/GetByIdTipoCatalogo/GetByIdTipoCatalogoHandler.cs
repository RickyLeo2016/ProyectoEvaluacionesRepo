using AutoMapper;
using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Application.Interface.Interface;
using Testify.Application.UseCase.Commons.Bases;
using Testify.Utilities.Constants;
using MediatR;
//using Testify.Utilities.Constants.Testify.Utilities.Constants;

namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Queries.GetByIdTipoCatalogo
{
    public class GetByIdTipoCatalogoHandler : IRequestHandler<GetByIdTipoCatalogoQuery, BaseResponse<GetByIdTipoCatalogoResponseDto>>
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public GetByIdTipoCatalogoHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<BaseResponse<GetByIdTipoCatalogoResponseDto>> Handle(GetByIdTipoCatalogoQuery request, CancellationToken cancellationToken)
        {
            var response = new BaseResponse<GetByIdTipoCatalogoResponseDto>();
            try
            {
                var parameters = new { request.tipCatId };
                var tipoCatalogo = await _unitOfWork.TipoCatalogo.GetByIdAsync(SP.spListarPorIdTipoCatalogo, parameters);
                if (tipoCatalogo is not null)
                {
                    response.IsSucess = true;
                    response.Data = _mapper.Map<GetByIdTipoCatalogoResponseDto>(tipoCatalogo);
                    response.Message = GlobalMessages.MESSAGE_QUERY;

                }
                else
                {
                    response.IsSucess = false;
                    response.Message = GlobalMessages.MESSAGE_QUERY_EMPTY;
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
