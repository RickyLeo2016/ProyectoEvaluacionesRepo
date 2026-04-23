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
    public class BancoPreguntaVersionRepository : GenericRepository<BancoPreguntaVersion>, IBancoPreguntaVersionRepository
    {
        public BancoPreguntaVersionRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<BancoPreguntaVersion>> GetAllPaginatedAsync(long empId, int pageNumber, int pageSize)
        {
            var parameters = new { empId=empId, PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarBancoPregunta, parameters);
        }


    }
}
