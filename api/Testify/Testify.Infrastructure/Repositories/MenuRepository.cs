using System;
using Testify.Application.Interfaces;
using Testify.Domain.Entities;
using Testify.Infrastructure.Persistence;
using Testify.Utilities.Constants;

namespace Testify.Infrastructure.Repositories
{
    public class MenuRepository : GenericRepository<Menu>, IMenuRepository
    {
        public MenuRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Menu>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var parameters = new { PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarMenu, parameters);
        }

        public async Task<IEnumerable<Menu>> GetMenuRolPaginatedAsync(long rolId, int pageNumber, int pageSize)
        {
            var parameters = new { RolId = rolId, PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spObtenerMenuPorRol, parameters);
        }

        public async Task<IEnumerable<Menu>> GetMenuPorUsuarioPaginatedAsync(long usuId, int pageNumber, int pageSize)
        {
            var parameters = new { UsuId = usuId, PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spObtenerMenuPorUsuario, parameters);
        }

        
    }
}
