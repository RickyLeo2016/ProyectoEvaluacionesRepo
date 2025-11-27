using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Domain.Entities
{
    public class Empresa
    {
        public int? empId { get; init; }
        public string? empNombre { get; init; } = string.Empty;
        public string? empRuc { get; init; } = string.Empty;
        public string? empDireccion { get; init; } = string.Empty;
        public int? empEstado { get; init; } = 1;
        public int? usuIdReg { get; init; }
    }
}
