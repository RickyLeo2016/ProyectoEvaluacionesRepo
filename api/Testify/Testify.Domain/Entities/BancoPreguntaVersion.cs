using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Domain.Entities
{
    public class BancoPreguntaVersion
    {
        public long banPreVerId { get; set; }

        public long banPreId { get; set; }
        public long catIdTipo { get; set; }

        public decimal banPreVerPuntaje { get; set; }
        public string banPreVerEnunciado { get; set; }

        public string banPreVerDataSchema { get; set; }

        public string? banPreVerUiSchema { get; set; }

        public int banPreVerNumero { get; set; }

        public long catIdEstado { get; set; }

        public long usuIdReg { get; set; }

        public DateTime banPreVerFechaReg { get; set; }

        public long? usuIdAct { get; set; }

        public DateTime? banPreVerFechaAct { get; set; }
    }
}
