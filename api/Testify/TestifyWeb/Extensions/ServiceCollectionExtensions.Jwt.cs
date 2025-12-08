using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace TestifyWeb.Extensions
{
    public static class ServiceCollectionExtensionsJwt
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSecret = configuration["Jwt:Secret"] ?? "CLAVE_SECRETA_POR_DEFECTO";
            var key = Encoding.ASCII.GetBytes(jwtSecret);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                options.Events = new JwtBearerEvents
                {
                    OnChallenge = context =>
                    {
                        // Evitar la respuesta por defecto (header WWW‑Authenticate, etc.)
                        context.HandleResponse();

                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        context.Response.ContentType = "application/json";

                        // Agregar cabeceras CORS necesarias
                        context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                        context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
                        context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";

                        var result = JsonSerializer.Serialize(new
                        {
                            isSuccess = false,
                            data = (object?)null,
                            message = "No autorizado. Token inválido o ausente.",
                            errors = new string[] { }
                        });
                        return context.Response.WriteAsync(result);
                    },
                    OnAuthenticationFailed = context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        context.Response.ContentType = "application/json";

                        context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                        context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
                        context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";

                        var result = JsonSerializer.Serialize(new
                        {
                            isSuccess = false,
                            data = (object?)null,
                            message = "Error de autenticación. Token inválido o expirado.",
                            errors = new string[] { }
                        });
                        return context.Response.WriteAsync(result);
                    },
                    OnForbidden = context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        context.Response.ContentType = "application/json";

                        context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                        context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
                        context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";

                        var result = JsonSerializer.Serialize(new
                        {
                            isSuccess = false,
                            data = (object?)null,
                            message = "No tienes permisos para acceder a este recurso.",
                            errors = new string[] { }
                        });
                        return context.Response.WriteAsync(result);
                    }
                };
            });

            return services;
        }
    }
}
