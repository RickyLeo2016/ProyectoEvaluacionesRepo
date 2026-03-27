using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface IRolRepository : IGenericRepository<Rol>
    {
        Task<IEnumerable<Rol>> GetAllPaginatedAsync(int pageNumber, int pageSize);
        
    }
}
