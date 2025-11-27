using Testify.Domain.Common;

namespace Testify.Domain.Entities
{
    public class TipoCatalogo 
    {
        public int tipCatId { get; set; }
        public string tipCatDescripcion { get; set; } = string.Empty;
        public string tipCatEstado { get; set; } = "A";
        public int UsuIdReg { get; set; }
        public DateTime? tipCatFechaRegistro { get; set; }
    }
}
