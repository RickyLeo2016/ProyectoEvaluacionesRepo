namespace Testify.Application.Interface.Interface
{
    /*
    * Representa una unidad de trabajo se utiliza para agrupar multiples 
    * operaciones de acceso a datos en una unica transacción  
    */
    public interface IUnitOfWork : IDisposable
    {
        /*Nos permite acceder a nuestra entidades*/
        //IGenericRepository<Analysis> Analysis { get; }
        ITipoCatalogoRepository TipoCatalogo { get; }
        ICatalogoRepository Catalogo { get; }
        //IMenuRepository Menu { get; }
        //IPermisosRepository Permisos { get; }
        ////IRolRepository Rol { get; }

        //IEmpleadoRepository Empleado { get; }
        //IUsuarioRepository Usuario { get; }

    }
}
