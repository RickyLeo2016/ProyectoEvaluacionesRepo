namespace Testify.Domain.Entities
{
    public class Rol
    {

        public long? rolId { get; init; }

        public string? rolNombre { get; init; } = string.Empty;

        public int? catIdEstado { get; init; }


        public string? rolEstadoDesc { get; init; } = string.Empty;
        public DateTime? catFechaReg { get; init; }

        
        public long? usuIdReg { get; init; }

    }
}
