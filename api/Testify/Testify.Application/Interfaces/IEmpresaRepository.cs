using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface IEmpresaRepository : IGenericRepository<Empresa>
    {
        // Método específico para paginación
        Task<IEnumerable<Empresa>> GetAllPaginatedAsync(int pageNumber, int pageSize);

    }
}
