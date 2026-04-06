namespace Testify.Application.Dtos
{
    public class MenuDto
    {

        public long? menId { get; init; }
        public string? menNombre { get; init; } = string.Empty;
        public string? menIcono { get; init; } = string.Empty;
        public string? menRuta{ get; init; } = string.Empty;
        public long? menPadreId { get; init; }
        public long? menOrden { get; init; }
        public long? catIdEstado { get; init; }

        public string? menEstadoDesc { get; init; } = string.Empty;
        public string? esPadre { get; init; } = string.Empty;


    }
}
