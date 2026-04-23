using FluentValidation;
using System.Text.Json;
using Testify.Application.Features.BancoPregunta.Commands;

public class CreateBancoPreguntaVersionValidator
    : AbstractValidator<CreateBancoPreguntaVersionCommand>
{
    public CreateBancoPreguntaVersionValidator()
    {
        //-------------------------------------------------
        // VALIDACIONES BASE
        //-------------------------------------------------

        RuleFor(x => x.banPreId)
            .GreaterThan(0)
            .WithMessage("El ID de la pregunta es obligatorio.");

        RuleFor(x => x.catIdTipo)
            .GreaterThan(0)
            .WithMessage("El tipo de pregunta es obligatorio.");

        RuleFor(x => x.puntaje)
            .GreaterThan(0)
            .WithMessage("El puntaje debe ser mayor a 0.");

        RuleFor(x => x.enunciado)
            .NotEmpty()
            .WithMessage("El enunciado es obligatorio.")
            .MaximumLength(1000)
            .WithMessage("El enunciado no debe exceder 1000 caracteres.");

        RuleFor(x => x.dataSchema)
            .NotEmpty()
            .WithMessage("El dataSchema es obligatorio.")
            .Must(BeValidJson)
            .WithMessage("El dataSchema debe ser un JSON válido.");

        RuleFor(x => x.uiSchema)
            .Must(BeValidJsonOrEmpty)
            .WithMessage("El uiSchema debe ser un JSON válido.");

        //-------------------------------------------------
        // VALIDACIÓN AVANZADA POR TIPO 🔥
        //-------------------------------------------------

        RuleFor(x => x)
            .Custom((request, context) =>
            {
                try
                {
                    var json = JsonDocument.Parse(request.dataSchema);
                    var root = json.RootElement;

                    switch (request.catIdTipo)
                    {
                        //-------------------------------------------------
                        // 8 - multiple_choice
                        //-------------------------------------------------
                        case 8:
                            RequireProperty(root, "options", context, "multiple_choice requiere 'options'");
                            RequireProperty(root, "correctAnswer", context, "multiple_choice requiere 'correctAnswer'");
                            break;

                        //-------------------------------------------------
                        // 9 - multiple_select
                        //-------------------------------------------------
                        case 9:
                            RequireProperty(root, "options", context, "multiple_select requiere 'options'");
                            RequireProperty(root, "correctAnswer", context, "multiple_select requiere 'correctAnswer'");
                            break;

                        //-------------------------------------------------
                        // 10 - true_false
                        //-------------------------------------------------
                        case 10:
                            RequireProperty(root, "options", context, "true_false requiere 'options'");
                            break;

                        //-------------------------------------------------
                        // 17 - numeric
                        //-------------------------------------------------
                        case 17:
                            RequireProperty(root, "correctAnswer", context, "numeric requiere 'correctAnswer'");
                            break;

                        //-------------------------------------------------
                        // 18 - numeric_range
                        //-------------------------------------------------
                        case 18:
                            if (!root.TryGetProperty("correctRange", out var range))
                            {
                                context.AddFailure("numeric_range requiere 'correctRange'");
                            }
                            else
                            {
                                RequireProperty(range, "min", context, "numeric_range requiere 'min'");
                                RequireProperty(range, "max", context, "numeric_range requiere 'max'");
                            }
                            break;

                        //-------------------------------------------------
                        // 21 - code
                        //-------------------------------------------------
                        case 21:
                            RequireProperty(root, "language", context, "code requiere 'language'");
                            break;

                        //-------------------------------------------------
                        // 22 - code_fix
                        //-------------------------------------------------
                        case 22:
                            RequireProperty(root, "buggyCode", context, "code_fix requiere 'buggyCode'");
                            break;

                        //-------------------------------------------------
                        // 23 - sql_query
                        //-------------------------------------------------
                        case 23:
                            RequireProperty(root, "expectedQuery", context, "sql_query requiere 'expectedQuery'");
                            break;

                        //-------------------------------------------------
                        // 24 - ordering
                        //-------------------------------------------------
                        case 24:
                            RequireProperty(root, "items", context, "ordering requiere 'items'");
                            RequireProperty(root, "correctOrder", context, "ordering requiere 'correctOrder'");
                            break;

                        //-------------------------------------------------
                        // 25 - matching
                        //-------------------------------------------------
                        case 25:
                            RequireProperty(root, "left", context, "matching requiere 'left'");
                            RequireProperty(root, "right", context, "matching requiere 'right'");
                            break;

                        //-------------------------------------------------
                        // DEFAULT
                        //-------------------------------------------------
                        default:
                            // tipos abiertos (texto, likert, etc.)
                            break;
                    }
                }
                catch
                {
                    context.AddFailure("Error al procesar el JSON de dataSchema.");
                }
            });
    }

    //-------------------------------------------------
    // HELPERS 🔥
    //-------------------------------------------------

    private bool BeValidJson(string json)
    {
        try
        {
            JsonDocument.Parse(json);
            return true;
        }
        catch
        {
            return false;
        }
    }

    private bool BeValidJsonOrEmpty(string json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return true;

        return BeValidJson(json);
    }

    private void RequireProperty(JsonElement element, string property, ValidationContext<CreateBancoPreguntaVersionCommand> context, string message)
    {
        if (!element.TryGetProperty(property, out _))
        {
            context.AddFailure(message);
        }
    }
}