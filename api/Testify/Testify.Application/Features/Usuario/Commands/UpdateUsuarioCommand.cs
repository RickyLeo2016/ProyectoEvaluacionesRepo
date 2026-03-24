using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;

namespace Testify.Application.Features.Usuario.Commands
{
    public class UpdateUsuarioCommand : IRequest<ApiResponse<bool>>
    {
        public long? usuId { get; init; }
        public string? usuEmail { get; init; } = string.Empty;
        public int? empId { get; init; }
        public string? usuNombres { get; init; } = string.Empty;
        public string? usuApellidos { get; init; } = string.Empty;
        public string? usuTelefono { get; init; } = string.Empty;
        public string? usuCelular { get; init; } = string.Empty;
        public int? catIdEstado { get; init; }
        public long? usuIdReg{ get; init; }

    }
}
