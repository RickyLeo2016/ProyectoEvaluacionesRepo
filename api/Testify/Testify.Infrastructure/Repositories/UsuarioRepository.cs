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
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(ApplicationContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Usuario>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var parameters = new { PageNumber = pageNumber, PageSize = pageSize };
            return await GetAllAsync(SP.spListarUsuario, parameters);
        }
        public async Task<Usuario?> GetByNombreUsuarioAsync(string nombreUsuario)
        {
            var parameters = new { usuNombre = nombreUsuario };
            return await QuerySingleAsync<Usuario>(SP.spObtenerUsuarioPorNombre, parameters);
        }

      
    }
}
