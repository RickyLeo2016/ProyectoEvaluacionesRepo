using Microsoft.Extensions.DependencyInjection;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Persistence;
using Testify.Infrastructure.Repositories;

namespace Testify.Infrastructure.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<ApplicationContext>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<ITipoCatalogoRepository, TipoCatalogoRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
