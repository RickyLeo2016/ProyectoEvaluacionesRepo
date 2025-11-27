namespace Testify.Application.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(string storedProcedure);
        Task<IEnumerable<T>> GetAllAsync(string storedProcedure, object parameters);
        Task<T?> GetByIdAsync(string storedProcedure, object parameters);
        Task<int> ExecuteAsync(string storedProcedure, object parameters);
    }
}
