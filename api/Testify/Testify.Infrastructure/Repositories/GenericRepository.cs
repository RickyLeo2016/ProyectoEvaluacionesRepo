using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Persistence;

namespace Testify.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationContext _context;

        public GenericRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync(string sp)
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryAsync<T>(sp, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<T>> GetAllAsync(string sp, object parameters)
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryAsync<T>(sp, parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<T?> GetByIdAsync(string sp, object parameters)
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<T>(sp, parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> ExecuteAsync(string sp, object parameters)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(sp, parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<T1> QuerySingleAsync<T1>(string storedProcedure, object parameters)
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryFirstAsync<T1>(
                   storedProcedure,
                   parameters,
                   commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<TResult>> QueryAsync<TResult>(string storedProcedure, object parameters)
        {
            using var connection = _context.CreateConnection();

            var result = await connection.QueryAsync<TResult>(
                storedProcedure,
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
    }
}
