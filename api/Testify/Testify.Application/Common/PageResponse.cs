namespace Testify.Application.Common
{
    public class PagedResponse<T>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int TotalCount { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        public bool HasPreviousPage => PageNumber > 1;
        public bool HasNextPage => PageNumber < TotalPages;

        public bool IsSuccess { get; set; } = true;
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;

        // Constructor para respuesta paginada
        public PagedResponse() { }

        public PagedResponse(T data, int pageNumber, int pageSize, int totalCount, string message = "Consulta Exitosa.")
        {
            Data = data;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
            Message = message;
            IsSuccess = true;
        }

        // Constructor para errores
        public PagedResponse(string message, bool isSuccess = false)
        {
            Message = message;
            IsSuccess = isSuccess;
        }
    }
}