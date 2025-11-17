using Dapper;
using System.Data;
using Testify.Application.Dto.Catalogo.Response;
using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Application.Interface.Interface;
using Testify.Domain.Entities;
using Testify.Persistence.Context;
using Testify.Persistence.Repositories;

namespace Testify.Persistence.Repositories
{

    public class CatalogoRepository : GenericRepository<Catalogo>, ICatalogoRepository
    {
        private readonly ApplicationDbContext _context;
        public CatalogoRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;

        }

        public async Task<IEnumerable<GetAllCatalogoResponseDto>> GetAllCatalogo(string storeProcedure, object parameters)
        {
            using var connection = _context.CreateConnection;
            var objParam = new DynamicParameters(parameters);
            var catalogo = await connection.QueryAsync<GetAllCatalogoResponseDto>
                (
                storeProcedure,
                param: objParam,
                commandType: CommandType.StoredProcedure,
                commandTimeout: 240);
            return catalogo;
        }
    }
}
