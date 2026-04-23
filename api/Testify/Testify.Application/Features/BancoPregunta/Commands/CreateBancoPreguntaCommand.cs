using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;

namespace Testify.Application.Features.BancoPregunta.Commands
{
    public class CreateBancoPreguntaCommand : IRequest<ApiResponse<bool>>
    {
        public long empId { get; set; }
        public long catIdTipo { get; set; }
        public decimal banPreVerPuntaje { get; set; }

        // VERSION
        public string? banPreVerEnunciado { get; set; }
        public string? banPreVerDataSchema { get; set; }
        public string? banPreVerUiSchema { get; set; }

        public long usuId { get; set; }

    }
}
