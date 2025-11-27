using Testify.Application.Interfaces;

namespace Testify.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    public ITipoCatalogoRepository TipoCatalogo { get; }
    public ICatalogoRepository Catalogo { get; }
    public IEmpresaRepository Empresa { get; }

    public UnitOfWork(
        ITipoCatalogoRepository tipoCatalogo,
        ICatalogoRepository catalogo,
        IEmpresaRepository empresa
        )
    {
        TipoCatalogo = tipoCatalogo;
        Catalogo = catalogo;
        Empresa = empresa;
    }
}