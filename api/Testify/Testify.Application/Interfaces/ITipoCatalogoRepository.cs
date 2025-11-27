using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface ITipoCatalogoRepository : IGenericRepository<TipoCatalogo>
    {
        // Método específico para paginación
        Task<IEnumerable<TipoCatalogo>> GetAllPaginatedAsync(int pageNumber, int pageSize);
        
    }
}
