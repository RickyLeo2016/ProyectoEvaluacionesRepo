using Dapper;
using Testify.Application.Interface.Interface;
using Testify.Persistence.Context;
using System.Data;

namespace Testify.Persistence.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        private readonly ApplicationDbContext _context;
        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<T>> GetAllAsync(string storedProcedure, object parameters)
        {
            using var conection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);
            return await conection.QueryAsync<T>(
                storedProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
        }

        //public async Task<T> GetByIdAsync(string storedProcedure, object parameters)
        //{
        //    using var conection = _context.CreateConnection;
        //    var objParam = new DynamicParameters(parameters);

        //    var resp = await conection.QuerySingleOrDefaultAsync<T>(
        //        storedProcedure,
        //        param: objParam,
        //        commandType: CommandType.StoredProcedure,
        //        commandTimeout: 240);

        //    return resp;
        //}

        public async Task<T> GetByIdAsync(string storedProcedure, object parameters)
        {
            using var connection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);

            var resp = await connection.QuerySingleOrDefaultAsync<T>(
                storedProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);

            if (resp == null)
                throw new InvalidOperationException($"No se encontró el registro usando {storedProcedure}");

            return resp;
        }


        public async Task<bool> ExecAsync(string storedProcedure, object parameters)
        {
            using var conection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);

            var recordsAffected = await conection
                .ExecuteAsync(
                storedProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
            return recordsAffected > 0;
        }


        public async Task<T> LoginUsuarioAsync(string storedProcedure, object parameters)
        {
            using var conection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);

            return await conection.QueryFirstAsync<T>(
                storedProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
        }




        ///Implementacion nuevo metodo 

        public async Task<T> GetByCuentaUsuarioAsync(string storedProcedure, object parameters)
        {
            using var conection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);

            return await conection.QueryFirstAsync<T>(
                storedProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
        }

        public async Task<T> GetUsuarioByNameAsync(string storedProcedure, object parameters)
        {
            using var conection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);

            return await conection.QueryFirstAsync<T>(
                storedProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
        }


        public async Task<T> GetByCedulaEmpleadoAsync(string storedProcedure, object parameters)
        {
            using var conection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);

            return await conection.QueryFirstAsync<T>(
                storedProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
        }




        #region Implementacion Paginacion

        public async Task<IEnumerable<T>> GetAllWithPaginationAsync(string storedProcedure, object parameters)
        {
            using var connection = _context.CreateConnection;

            var objParam = new DynamicParameters(parameters);
            return await connection.QueryAsync<T>(
                    storedProcedure,
                    param: objParam,
                    commandType: CommandType.StoredProcedure);

        }

        //Cuenta registros de tabla 
        public async Task<int> CountAsync(string tableName, string estado)
        {
            using var connection = _context.CreateConnection;
            var query = $"select count(1) from {tableName} where {estado}";
            var count = await connection.ExecuteScalarAsync<int>(
                query,
                commandType: CommandType.Text,
                commandTimeout: 240);

            return count;
        }









        #endregion
    }
}
