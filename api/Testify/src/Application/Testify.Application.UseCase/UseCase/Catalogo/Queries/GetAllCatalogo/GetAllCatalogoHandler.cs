using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Dto.Catalogo.Response;
using Testify.Application.Interface.Interface;
using Testify.Application.UseCase.Commons.Bases;
using Testify.Application.UseCase.UseCase.Catalogo.Queries.GetAllCatalogo;
using Testify.Utilities.Constants;

namespace Testify.Application.UseCase.UseCase.Catalogo.Queries.GetAllCatalogo
{
    public class GetAllCatalogoHandler : IRequestHandler<GetAllCatalogoQuery, BasePaginationResponse<IEnumerable<GetAllCatalogoResponseDto>>>
    {
        private readonly IUnitOfWork _unitOfWork;


        public GetAllCatalogoHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BasePaginationResponse<IEnumerable<GetAllCatalogoResponseDto>>> Handle(GetAllCatalogoQuery request, CancellationToken cancellationToken)
        {
            var response = new BasePaginationResponse<IEnumerable<GetAllCatalogoResponseDto>>();

            try
            {
                var count = await _unitOfWork.Catalogo.CountAsync(TB.tbCatalogo, " catEstado='A'");
                var catalogo = await _unitOfWork.Catalogo.GetAllCatalogo(SP.spListarCatalogo, request);
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
