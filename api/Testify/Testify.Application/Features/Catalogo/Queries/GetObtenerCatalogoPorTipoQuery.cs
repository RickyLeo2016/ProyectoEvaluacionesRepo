using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Catalogo.Queries
{
    public class GetObtenerCatalogoPorTipoQuery : IRequest<ApiResponse<IEnumerable<CatalogoDto>>>
    {
        public long tipCatId { get; set; }
    }
}
