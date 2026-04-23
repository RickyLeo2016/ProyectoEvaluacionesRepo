using Testify.Application.Interfaces;

namespace Testify.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    public ITipoCatalogoRepository TipoCatalogo { get; }
    public ICatalogoRepository Catalogo { get; }
    public IEmpresaRepository Empresa { get; }
    public IUsuarioRepository Usuario { get; }
    public IRolRepository Rol { get; }
    public IUsuarioRolRepository UsuarioRol { get; }
    public IMenuRepository Menu { get; }
    public IBancoPreguntaRepository BancoPregunta { get; }
    public IBancoPreguntaVersionRepository BancoPreguntaVersion { get; }

    public UnitOfWork(
        ITipoCatalogoRepository tipoCatalogo,
        ICatalogoRepository catalogo,
        IEmpresaRepository empresa,
        IUsuarioRepository usuario,
        IRolRepository rol,
        IUsuarioRolRepository usuarioRol,
        IMenuRepository menu,

        IBancoPreguntaRepository bancoPregunta,
        IBancoPreguntaVersionRepository bancoPreguntaVersion

        )
    {
        TipoCatalogo = tipoCatalogo;
        Catalogo = catalogo;
        Empresa = empresa;
        Usuario = usuario;
        UsuarioRol = usuarioRol;
        Rol = rol;
        Menu = menu;
        BancoPregunta = bancoPregunta;  
        BancoPreguntaVersion = bancoPreguntaVersion;
    }
}