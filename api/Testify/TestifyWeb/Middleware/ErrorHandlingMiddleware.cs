using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;

namespace TestifyWeb.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException ex)
            {
                // Manejo de errores de FluentValidation
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";

                var response = new
                {
                    isSuccess = false,
                    data = (object?)null,
                    message = "Errores de validación",
                    errors = ex.Errors.Select(e => new { Campo = e.PropertyName, msjError = e.ErrorMessage })
                };

                await context.Response.WriteAsJsonAsync(response);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var response = new
                {
                    isSuccess = false,
                    data = (object?)null,
                    message = ex.Message,
                    errors = Array.Empty<object>()
                };

                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }

    // Extensión para registrar el middleware
    public static class ErrorHandlingMiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ErrorHandlingMiddleware>();
        }
    }
}
