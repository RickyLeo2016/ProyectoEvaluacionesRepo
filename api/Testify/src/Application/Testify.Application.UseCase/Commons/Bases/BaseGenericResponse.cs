namespace Testify.Application.UseCase.Commons.Bases
{
    public class BaseGenericResponse<T>
    {
        public bool IsSucess { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public IEnumerable<BaseErrors>? Errors { get; set; }
    }
}
