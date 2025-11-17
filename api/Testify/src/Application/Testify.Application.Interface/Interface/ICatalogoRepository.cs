using Testify.Application.Dto.Catalogo.Response;
using Testify.Domain.Entities;

namespace Testify.Application.Interface.Interface
{
    public interface ICatalogoRepository : IGenericRepository<Catalogo>
    {
        Task<IEnumerable<GetAllCatalogoResponseDto>> GetAllCatalogo(string storeProcedure, object parameters);

    }
}
