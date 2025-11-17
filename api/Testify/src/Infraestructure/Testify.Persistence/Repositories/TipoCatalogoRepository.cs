using Dapper;
using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Application.Interface.Interface;
using Testify.Domain.Entities;
using Testify.Persistence.Context;
using System.Data;
using Testify.Persistence.Repositories;

namespace Seleccion.Persistence.Repositories
{
    public class TipoCatalogoRepository : GenericRepository<TipoCatalogo>, ITipoCatalogoRepository
    {
        private readonly ApplicationDbContext _context;
        public TipoCatalogoRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;

        }

        public async Task<IEnumerable<GetAllTipoCatalogoResponseDto>> GetAllTipoCatalogo(string storeProcedure, object parameters)
        {
            using var connection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);
            var exam = await connection.QueryAsync<GetAllTipoCatalogoResponseDto>
                (
                storeProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
            return exam;
        }
    }
}
