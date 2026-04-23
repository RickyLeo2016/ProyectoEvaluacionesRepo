using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface IBancoPreguntaVersionRepository : IGenericRepository<BancoPreguntaVersion>
    {
        Task<IEnumerable<BancoPreguntaVersion>> GetAllPaginatedAsync(long empId, int pageNumber, int pageSize);

    }
}
