namespace Testify.Application.Interfaces
{
    public interface IUnitOfWork
    {
        ITipoCatalogoRepository TipoCatalogo { get; }
        ICatalogoRepository Catalogo { get; }
        IEmpresaRepository Empresa { get; }
        IUsuarioRepository Usuario { get; }
        IRolRepository Rol { get; }
        IUsuarioRolRepository UsuarioRol { get; }
        IMenuRepository Menu { get; }
        IBancoPreguntaRepository BancoPregunta { get; }
        IBancoPreguntaVersionRepository BancoPreguntaVersion { get; }
    }
}
