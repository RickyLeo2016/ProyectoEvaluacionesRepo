namespace Testify.Domain.Entities
{
    public class Catalogo
    {
        public long? catId { get; init; }
        public long? tipCatId { get; init; }

        public string? catNombre { get; init; } = string.Empty;
        public string? catDescripcion { get; init; } = string.Empty;
        public string? catEstado { get; init; }
        
        public int? usuIdReg { get; init; }
        public DateTime? catFechaReg { get; init; }

        
        public string? tipCatDescripcion { get; init; } = string.Empty;
    }
}
