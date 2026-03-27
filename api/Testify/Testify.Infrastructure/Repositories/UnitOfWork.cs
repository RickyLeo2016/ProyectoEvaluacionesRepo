using Testify.Application.Interfaces;

namespace Testify.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    public ITipoCatalogoRepository TipoCatalogo { get; }
    public ICatalogoRepository Catalogo { get; }
    public IEmpresaRepository Empresa { get; }
    public IUsuarioRepository Usuario { get; }
    public IRolRepository Rol { get; }

    public UnitOfWork(
        ITipoCatalogoRepository tipoCatalogo,
        ICatalogoRepository catalogo,
        IEmpresaRepository empresa,
        IUsuarioRepository usuario,
        IRolRepository rol

        )
    {
        TipoCatalogo = tipoCatalogo;
        Catalogo = catalogo;
        Empresa = empresa;
        Usuario = usuario;
        Rol = rol;
    }
}