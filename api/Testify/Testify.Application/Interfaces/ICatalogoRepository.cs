using Testify.Domain.Entities;

namespace Testify.Application.Interfaces
{
    public interface ICatalogoRepository : IGenericRepository<Catalogo>
    {
        // Método específico para paginación
        Task<IEnumerable<Catalogo>> GetAllPaginatedAsync(int pageNumber, int pageSize);
        
    }
}
