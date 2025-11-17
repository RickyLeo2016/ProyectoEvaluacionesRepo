using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Domain.Entities;


namespace Testify.Application.Interface.Interface
{
    public interface ITipoCatalogoRepository : IGenericRepository<TipoCatalogo>
    {
        Task<IEnumerable<GetAllTipoCatalogoResponseDto>> GetAllTipoCatalogo(string storeProcedure, object parameters);

    }
}
