namespace Testify.Application.Dto.Catalogo.Response
{
    public class GetAllCatalogoResponseDto
    {
        public int? catId { get; set; }
        public string? catNombre { get; set; }
        public string? catDescripcion { get; set; }
        public string? catEstado { get; set; }
        public DateTime catFechaRegistro { get; set; }
    }
}
