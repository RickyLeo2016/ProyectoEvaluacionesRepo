using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Application.Dtos
{
    public class AssignUsuarioRolDto
    {
        public long rolId { get; set; }
        
        public int rolSelec { get; set; } // 1=activo, 2=inactivo
    }
}
