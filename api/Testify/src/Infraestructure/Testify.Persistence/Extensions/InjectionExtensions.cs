using Testify.Application.Interface.Interface;
using Testify.Persistence.Context;
using Testify.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Testify.Persistence.Extensions
{
    public static class InjectionExtensions
    {
        public static IServiceCollection AddInjectionPersistence(this IServiceCollection services)
        {
            services.AddSingleton<ApplicationDbContext>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}
