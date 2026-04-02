using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface IUsuarioRolRepository : IGenericRepository<UsuarioRol>
    {
        Task<IEnumerable<UsuarioRol>> GetUsuarioRolPaginatedAsync(long usuId, int pageNumber, int pageSize);
    }
}
