using Testify.Application.Interfaces;
using Testify.Domain.Entities;
using Testify.Infrastructure.Persistence;
using Testify.Utilities.Constants;

namespace Testify.Infrastructure.Repositories
{
    public class EmpresaRepository : GenericRepository<Empresa>, IEmpresaRepository
    {
        public EmpresaRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Empresa>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var parameters = new { PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarEmpresa, parameters);
        }

    }
}

