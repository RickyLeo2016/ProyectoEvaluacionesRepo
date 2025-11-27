using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Testify.Application.Behaviors;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Persistence;
using Testify.Infrastructure.Repositories;
using static System.Net.Mime.MediaTypeNames;

namespace TestifyWeb.Extensions
{
    public static class ServiceCollectionExtensionsApplication
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {

            services.AddValidatorsFromAssembly(typeof(Testify.Application.AssemblyReference).Assembly);
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(Testify.Application.AssemblyReference).Assembly);
            });

            // =========================
            // Pipeline Behavior para validación
            // =========================
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            // =========================
            // Dapper Context
            // =========================
            services.AddSingleton<ApplicationContext>();

            // =========================
            // Registro AUTOMÁTICO de TODOS los repositorios que terminen en "Repository"
            // =========================
            services.Scan(scan =>
            {
                scan.FromAssembliesOf(typeof(TipoCatalogoRepository)) // ajusta según tus repositorios
                    .AddClasses(c => c.Where(t => t.Name.EndsWith("Repository")))
                    .AsImplementedInterfaces()
                    .WithScopedLifetime();
            });

            // =========================
            // Registrar UnitOfWork
            // =========================
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // =========================
            // CORS
            // =========================
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            return services;
        }
    }
}
