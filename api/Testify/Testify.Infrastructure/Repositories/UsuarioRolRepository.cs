using Testify.Application.Interfaces;
using Testify.Domain.Entities;
using Testify.Infrastructure.Persistence;
using Testify.Utilities.Constants;

namespace Testify.Infrastructure.Repositories
{
    public class UsuarioRolRepository : GenericRepository<UsuarioRol>, IUsuarioRolRepository
    {
        public UsuarioRolRepository(ApplicationContext context) : base(context)
        {
        }
        public async Task<IEnumerable<UsuarioRol>> GetUsuarioRolPaginatedAsync(long usuId, int pageNumber, int pageSize)
        {
            var parameters = new { UsuId = usuId, PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarUsuarioRol, parameters);
        }
    }
}
