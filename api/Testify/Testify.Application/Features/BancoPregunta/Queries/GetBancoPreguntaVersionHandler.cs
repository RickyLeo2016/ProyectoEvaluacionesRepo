using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;
using Testify.Application.Features.Rol.Query;
using Testify.Application.Interfaces;

namespace Testify.Application.Features.BancoPregunta.Queries
{
    public class GetBancoPreguntaVersionHandler : IRequestHandler<GetBancoPreguntaVersionQuery, PagedResponse<IEnumerable<BancoPreguntaVersionDto>>>
    {
        private readonly IUnitOfWork _unit;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetBancoPreguntaVersionHandler(
            IUnitOfWork unit,
            IHttpContextAccessor httpContextAccessor)
        {
            _unit = unit;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<PagedResponse<IEnumerable<BancoPreguntaVersionDto>>> Handle(GetBancoPreguntaVersionQuery request,
            CancellationToken cancellationToken)
        {

            var empIdClaim = _httpContextAccessor?
                            .HttpContext?
                            .User?
                            .FindFirst("empId")?.Value;

            if (string.IsNullOrEmpty(empIdClaim))
            {
                return new PagedResponse<IEnumerable<BancoPreguntaVersionDto>>(
                    Enumerable.Empty<BancoPreguntaVersionDto>(),
                    request.PageNumber,
                    request.PageSize,
                    0
                );
            }

            var empId = Convert.ToInt64(empIdClaim);


            var result = await _unit.BancoPreguntaVersion.GetAllPaginatedAsync(empId,request.PageNumber, request.PageSize);
            var totalCount = result.Count();
            var dto = result.Select(x => new BancoPreguntaVersionDto
            {
                banPreId = x.banPreId,
                //empId = x.empId,
                banPreVerId = x.banPreVerId,
                catIdTipo = x.catIdTipo,
                //tipPreguntaDesc = x.tipo,
                banPreVerPuntaje = x.banPreVerPuntaje,
                banPreVerEnunciado = x.banPreVerEnunciado,
                banPreVerDataSchema = x.banPreVerDataSchema,
                banPreVerUiSchema = x.banPreVerUiSchema,
                banPreVerNumero = x.banPreVerNumero,
                fechaReg = x.banPreVerFechaReg
            });

            return new PagedResponse<IEnumerable<BancoPreguntaVersionDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalCount
            );
        }
    }
}
