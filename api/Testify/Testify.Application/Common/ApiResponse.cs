namespace Testify.Application.Common
{
    // Para operaciones tipo Insert, Update, Delete
    public class ApiResponse<T>
    {
        public bool IsSuccess { get; set; } = true;
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public IEnumerable<object>? Errors { get; set; }

        public ApiResponse() { }

        // Respuesta exitosa
        public ApiResponse(T? data, string message = "Operación exitosa", bool isSuccess = true)
        {
            Data = data;
            Message = message;
            IsSuccess = isSuccess;
        }

        // Para errores
        public ApiResponse(string message, IEnumerable<object>? errors = null, bool isSuccess = false)
        {
            Message = message;
            Errors = errors;
            IsSuccess = isSuccess;
        }
    }
}
