using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Application.Interface.Interface;
using Testify.Application.UseCase.Commons.Bases;
using Testify.Utilities.Constants;
using MediatR;
//using Testify.Utilities.Constants.Testify.Utilities.Constants;
namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Queries.GetAllTipoCatalogo
{
    public class GetAllTipoCatalogoHandler : IRequestHandler<GetAllTipoCatalogoQuery, BasePaginationResponse<IEnumerable<GetAllTipoCatalogoResponseDto>>>
    {
        private readonly IUnitOfWork _unitOfWork;


        public GetAllTipoCatalogoHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BasePaginationResponse<IEnumerable<GetAllTipoCatalogoResponseDto>>> Handle(GetAllTipoCatalogoQuery request, CancellationToken cancellationToken)
        {
            var response = new BasePaginationResponse<IEnumerable<GetAllTipoCatalogoResponseDto>>();

            try
            {
                var count = await _unitOfWork.TipoCatalogo.CountAsync(TB.tbTipoCatalogo, " tipCatEstado='A'");
                var catalogo = await _unitOfWork.TipoCatalogo.GetAllTipoCatalogo(SP.spListarTipoCatalogo, request);
                if (catalogo is not null)
                {
                    response.IsSucess = true;
                    response.PageNumber = request.PageNumber;
                    response.TotalPages = (int)Math.Ceiling(count / (double)request.PageSize);
                    response.TotalCount = count;
                    response.Data = catalogo;
                    response.Message = GlobalMessages.MESSAGE_QUERY;
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
