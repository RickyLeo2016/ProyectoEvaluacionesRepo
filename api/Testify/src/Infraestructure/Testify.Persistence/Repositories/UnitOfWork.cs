using Seleccion.Persistence.Repositories;
using Testify.Application.Interface.Interface;
using Testify.Persistence.Context;

namespace Testify.Persistence.Repositories
{
    internal class UnitOfWork : IUnitOfWork
    {

        private readonly ApplicationDbContext _context;
        //public IGenericRepository<Analysis> Analysis { get; }

        public ITipoCatalogoRepository TipoCatalogo { get; }
        public ICatalogoRepository Catalogo { get; }
        //public IMenuRepository Menu { get; }

        ////public ISubMenuRepository SubMenu { get; }
        ////public IRolRepository Rol { get; }

        ////public ISubMenuRolRepository SubMenuRol { get; }
        //public IPermisosRepository Permisos { get; }
        //public IEmpleadoRepository Empleado { get; }
        //public IUsuarioRepository Usuario { get; }



        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            //Analysis = analysis;

            TipoCatalogo = new TipoCatalogoRepository(_context);
            Catalogo = new CatalogoRepository(_context);
            //Menu = new MenuRepository(_context);
            ////SubMenu = new SubMenuRepository(_context);
            ////Rol = new RolRepository(_context);
            ////SubMenuRol = new SubMenuRolRepository(_context);
            //Permisos = new PermisosRepository(_context);
            //Empleado = new EmpleadoRepository(_context);
            //Usuario = new UsuarioRepository(_context);

        }

        public void Dispose()
        {
            //Elimina la conexion a nuestra DB de los recursos no utilizados
            GC.SuppressFinalize(this);
        }
    }
}
