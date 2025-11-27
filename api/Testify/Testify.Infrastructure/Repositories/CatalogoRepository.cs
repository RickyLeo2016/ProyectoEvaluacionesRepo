using Testify.Application.Interfaces;
using Testify.Domain.Entities;
using Testify.Infrastructure.Persistence;
using Testify.Utilities.Constants;


namespace Testify.Infrastructure.Repositories
{
    public class CatalogoRepository : GenericRepository<Catalogo>, ICatalogoRepository
    {
        public CatalogoRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Catalogo>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var parameters = new { PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarCatalogo, parameters);
        }


    }
}
