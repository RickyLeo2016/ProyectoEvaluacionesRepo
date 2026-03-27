using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Interfaces;
using Testify.Domain.Entities;
using Testify.Infrastructure.Persistence;
using Testify.Utilities.Constants;

namespace Testify.Infrastructure.Repositories
{
    public class RolRepository : GenericRepository<Rol>, IRolRepository
    {
        public RolRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Rol>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var parameters = new { PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarRol, parameters);
        }


    }
}
