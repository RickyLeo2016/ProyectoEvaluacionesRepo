namespace Testify.Application.Interfaces
{
    public interface IUnitOfWork
    {
        ITipoCatalogoRepository TipoCatalogo { get; }
        ICatalogoRepository Catalogo { get; }
    }
}
