namespace Testify.Application.Interface.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(string storedProcedure, object parameters);
        Task<T> GetByIdAsync(string storedProcedure, object parameters);
        Task<bool> ExecAsync(string storedProcedure, object parameters);

        Task<T> LoginUsuarioAsync(string storedProcedure, object parameters);


        //Esta se ocupa
        Task<T> GetUsuarioByNameAsync(string storedProcedure, object parameters);

        //Usados
        Task<T> GetByCuentaUsuarioAsync(string storedProcedure, object parameters);
        Task<T> GetByCedulaEmpleadoAsync(string storedProcedure, object parameters);







        #region Metodos Paginación

        Task<IEnumerable<T>> GetAllWithPaginationAsync(string storedProcedure, object parameters);
        Task<int> CountAsync(string tableName, string estado);

        #endregion


    }
}
