using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Domain.Entities
{
    public class Rol
    {

        public long? rolId { get; init; }

        public string? rolNombre { get; init; } = string.Empty;

        public int? catIdEstado { get; init; }


        public string? rolEstadoDesc { get; init; } = string.Empty;

        
        public long? usuIdReg { get; init; }
        public DateTime? catFechaReg { get; init; }

    }
}
