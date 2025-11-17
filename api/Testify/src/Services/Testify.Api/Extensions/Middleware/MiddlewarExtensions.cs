namespace Testify.Api.Extensions.Middleware
{
    public static class MiddlewarExtensions
    {
        public static IApplicationBuilder AddMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidatorMiddleware>();
        }
    }
}
