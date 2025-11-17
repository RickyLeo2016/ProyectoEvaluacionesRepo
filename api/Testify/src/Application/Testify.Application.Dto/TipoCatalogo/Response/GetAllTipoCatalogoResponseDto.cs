namespace Testify.Application.Dto.TipoCatalogo.Response
{
    public class GetAllTipoCatalogoResponseDto
    {
        public int? tipCatId { get; set; }
        public string? tipCatDescripcion { get; set; }
        public string? tipCatEstado { get; set; }
        public DateTime tipCatFechaRegistro { get; set; }
    }
}
