namespace Testify.Application.Dtos
{
    public class UsuarioDto
    {
        public long? usuId { get; init; }

        public string? usuNombre { get; init; } = string.Empty;
        public string? usuEmail { get; init; } = string.Empty;
        public string? usuPassHash { get; init; } = string.Empty;

        //Detalle Usuario
        public int? empId { get; init; }
        public string? usuDetDNI { get; init; } = string.Empty;
        public string? usuNombres { get; init; } = string.Empty;
        public string? usuApellidos { get; init; } = string.Empty;
        public string? usuTelefono { get; init; } = string.Empty;
        public string? usuCelular { get; init; } = string.Empty;
        
        public string? empDireccion { get; init; } = string.Empty;
        public int? catIdEstado { get; init; }
        public string? usuEstadoDesc { get; init; }
        
        
        public string? empNombre { get; init; }



        public DateTime? usuFechaReg { get; init; }
        public int? usuIdReg { get; init; }


       
    }
}
