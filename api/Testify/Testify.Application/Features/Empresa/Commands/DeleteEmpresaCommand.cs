using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;

namespace Testify.Application.Features.Empresa.Commands
{
    public  class DeleteEmpresaCommand : IRequest<ApiResponse<bool>>
    {
        public long? empId { get; init; }
        public int? usuIdReg { get; init; }

    }
}
