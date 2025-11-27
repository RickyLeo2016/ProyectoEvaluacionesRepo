namespace Testify.Application.Dtos
{
    public class EmpresaDto
    {
        public int? empId { get; init; }
        public string? empNombre { get; init; } = string.Empty;
        public string? empRuc { get; init; } = string.Empty;
        public string? empDireccion { get; init; } = string.Empty;
        public string? empEstado { get; init; } = "A";
        public int? usuIdReg { get; init; }
        
    }
}
