namespace Testify.Application.Common
{
    public class SpResponse<T>
    {
        public string Codigo { get; set; } = string.Empty;
        public string Mensaje { get; set; } = string.Empty;
        public T? Data { get; set; }
    }
}
