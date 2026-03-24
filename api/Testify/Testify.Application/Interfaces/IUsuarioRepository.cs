using System.Data;
using System.Data.Common;
using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface IUsuarioRepository : IGenericRepository<Usuario>
    {
        Task<IEnumerable<Usuario>> GetAllPaginatedAsync(int pageNumber, int pageSize);

        Task<Usuario?> GetByNombreUsuarioAsync(string nombreUsuario);
    }
}
