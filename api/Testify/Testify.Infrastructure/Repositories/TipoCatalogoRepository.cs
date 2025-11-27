using Testify.Application.Interfaces;
using Testify.Domain.Entities;
using Testify.Infrastructure.Persistence;
using Testify.Utilities.Constants;

namespace Testify.Infrastructure.Repositories
{
    public class TipoCatalogoRepository : GenericRepository<TipoCatalogo>, ITipoCatalogoRepository
    {
        public TipoCatalogoRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TipoCatalogo>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var parameters = new { PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarTipoCatalogo, parameters);
        }

    }
}
