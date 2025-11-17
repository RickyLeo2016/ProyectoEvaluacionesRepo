using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace Testify.Api.Extensions.Swagger
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            var openApi = new OpenApiInfo
            {
                Title = "Testify API",
                Version = "v1",
                Description = "Sistema de Evaluaciones Psicometricas y Técnicas",
                TermsOfService = new Uri("https://www.contraloria.gob.ec/"),//Terminos del servicio
                Contact = new OpenApiContact
                {
                    Name = "Ricardo Sigcha",
                    Email = "rleo.9016@gmail.com",
                    Url = new Uri("https://www.contraloria.gob.ec/") // pagina del contacto portafolio
                },
                License = new OpenApiLicense
                {
                    Name = "Uso restringido",
                    Url = new Uri("https://www.contraloria.gob.ec/") // Licencia

                }
            };


            services.AddSwaggerGen(x =>
            {
                openApi.Version = "v1";
                x.SwaggerDoc("v1", openApi);
                var securitySchema = new OpenApiSecurityScheme
                {
                    Name = "Jwt Authentication",
                    Description = "Jvw Bearer Token",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };

                x.AddSecurityDefinition(securitySchema.Reference.Id, securitySchema);
                x.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {securitySchema, new string[]{} }
                });
            });
            return services;
        }
    }
}
