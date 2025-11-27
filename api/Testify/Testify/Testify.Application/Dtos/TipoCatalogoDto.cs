namespace Testify.Application.Dtos
{
    public record TipoCatalogoDto
    {
        public int? tipCatId { get; init; }
        public string? tipCatDescripcion { get; init; } = string.Empty;
        public string? tipCatEstado { get; init; } = "A";
        public int? UsuIdReg { get; init; }
        public DateTime? tipCatFechaRegistro { get; init; }
    }

}
