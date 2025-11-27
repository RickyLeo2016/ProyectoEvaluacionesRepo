using FluentValidation;
using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
        where TResponse : ApiResponse<bool>, new() // O ApiResponse<T> si quieres genérico
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TRequest>(request);
                var failures = _validators
                    .Select(v => v.Validate(context))
                    .SelectMany(result => result.Errors)
                    .Where(f => f != null)
                    .ToList();

                if (failures.Count != 0)
                {
                    // Creamos la respuesta de error con el tipo correcto
                    var response = new TResponse();
                    response.IsSuccess = false;
                    response.Data = default; // null o false según tu tipo
                    response.Message = "Errores de validación";
                    response.Errors = failures
                        .Select(f => new { Campo = f.PropertyName, msjError = f.ErrorMessage })
                        .Cast<object>()
                        .ToList();

                    return response;
                }
            }

            return await next();
        }
    }
}
