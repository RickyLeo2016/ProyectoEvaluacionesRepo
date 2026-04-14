using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface IMenuRepository : IGenericRepository<Menu>
    {
        Task<IEnumerable<Menu>> GetAllPaginatedAsync(int pageNumber, int pageSize);
        Task<IEnumerable<Menu>> GetMenuRolPaginatedAsync(long rolId, int pageNumber, int pageSize);
        Task<IEnumerable<Menu>> GetMenuPorUsuarioPaginatedAsync(long usuId, int pageNumber, int pageSize);




    }
}
