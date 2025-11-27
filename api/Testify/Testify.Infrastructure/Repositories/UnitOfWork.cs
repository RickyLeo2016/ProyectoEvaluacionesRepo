using Testify.Application.Interfaces;

namespace Testify.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    public ITipoCatalogoRepository TipoCatalogo { get; }

    public UnitOfWork(ITipoCatalogoRepository tipoCatalogo)
    {
        TipoCatalogo = tipoCatalogo;
    }
}