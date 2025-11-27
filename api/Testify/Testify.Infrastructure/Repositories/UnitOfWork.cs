using Testify.Application.Interfaces;

namespace Testify.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    public ITipoCatalogoRepository TipoCatalogo { get; }
    public ICatalogoRepository Catalogo { get; }

    public UnitOfWork(
        ITipoCatalogoRepository tipoCatalogo,
        ICatalogoRepository catalogo
        )
    {
        TipoCatalogo = tipoCatalogo;
        Catalogo = catalogo;
    }
}