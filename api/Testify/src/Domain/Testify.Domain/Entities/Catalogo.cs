namespace Testify.Domain.Entities
{
    public class Catalogo
    {
        public int? catId { get; set; }
        public int? tipCatId { get; set; }
        public string? catNombre { get; set; }
        public string? catDescripcion { get; set; }
        public string? catEstado { get; set; }
        public int? usuIdReg { get; set; } = 0;
    }
}
