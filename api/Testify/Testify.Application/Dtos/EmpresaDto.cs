namespace Testify.Application.Dtos
{
    public class EmpresaDto
    {
        public int? empId { get; init; }
        public string? empNombre { get; init; } = string.Empty;
        public string? empRuc { get; init; } = string.Empty;
        public string? empDireccion { get; init; } = string.Empty;
        public string? empEstadoDesc { get; init; }

        public DateTime? empFechaReg { get; init; }
        public int? usuIdReg { get; init; }
        
    }
}
