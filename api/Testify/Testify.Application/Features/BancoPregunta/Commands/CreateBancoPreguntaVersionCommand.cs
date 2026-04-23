using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Common;

namespace Testify.Application.Features.BancoPregunta.Commands
{
    public class CreateBancoPreguntaVersionCommand : IRequest<ApiResponse<bool>>
    {
        public long banPreId { get; set; }

        public long catIdTipo { get; set; }
        public decimal puntaje { get; set; }
        public string enunciado { get; set; }

        public string dataSchema { get; set; }

        public string uiSchema { get; set; }
    }
}
