using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;

namespace Testify.Application.Features.Empresa.Commands
{
    public class UpdateEmpresaCommand : IRequest<ApiResponse<bool>>
    {
        public long? empId { get; init; } 
        public string? empNombre { get; init; } = string.Empty;
        public string? empRuc { get; init; } = string.Empty;
        public string? empDireccion { get; init; } = string.Empty;
        public int? usuIdReg { get; init; }

    }
}
