using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Domain.Entities
{
    public  class Menu
    {
        public long? menId { get; init; }
        public string? menNombre { get; init; } = string.Empty;
        public string? menIcono { get; init; } = string.Empty;
        public string? menRuta { get; init; } = string.Empty;
        public long? menPadreId { get; init; }
        public long? menOrden { get; init; }
        public long? catIdEstado { get; init; }


        public string? menEstadoDesc { get; init; } = string.Empty;
        public DateTime? menFechaReg { get; init; }
        public string? esPadre { get; init; } = string.Empty;
    }
}
