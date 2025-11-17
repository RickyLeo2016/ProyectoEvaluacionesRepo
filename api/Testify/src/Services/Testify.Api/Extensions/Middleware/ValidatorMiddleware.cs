using Testify.Application.UseCase.Commons.Bases;
using Testify.Application.UseCase.Commons.Exeptions;
using Testify.Utilities.Constants;
using System.Text.Json;

namespace Testify.Api.Extensions.Middleware
{
    public class ValidatorMiddleware
    {
        private readonly RequestDelegate _next;
        public ValidatorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (ValidationExceptions ex)
            {
                context.Response.ContentType = "application/json";
                await JsonSerializer.SerializeAsync(context.Response.Body, new BaseResponse<object>
                {
                    Message = GlobalMessages.MESSAGE_VALIDATE,
                    Errors = ex.Errors
                });

            }
        }

    }
}
