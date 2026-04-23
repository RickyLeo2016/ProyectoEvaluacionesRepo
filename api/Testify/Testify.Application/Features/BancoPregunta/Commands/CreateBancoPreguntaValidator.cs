using FluentValidation;
using System.Text.Json;

namespace Testify.Application.Features.BancoPregunta.Commands
{
    public class CreateBancoPreguntaValidator : AbstractValidator<CreateBancoPreguntaCommand>
    {
        public CreateBancoPreguntaValidator()
        {
            //---------------------------------------------------
            // IDS
            //---------------------------------------------------
            //RuleFor(x => x.empId)
            //    .GreaterThan(0)
            //    .WithMessage("La empresa es obligatoria.");

            RuleFor(x => x.catIdTipo)
                .GreaterThan(0)
                .WithMessage("El tipo de pregunta es obligatorio.");

            //RuleFor(x => x.usuId)
            //    .GreaterThan(0)
            //    .WithMessage("El usuario es obligatorio.");

            //---------------------------------------------------
            // PUNTAJE
            //---------------------------------------------------
            RuleFor(x => x.banPreVerPuntaje)
                .GreaterThan(0)
                .WithMessage("El puntaje debe ser mayor que cero.");

            //---------------------------------------------------
            // ENUNCIADO
            //---------------------------------------------------
            RuleFor(x => x.banPreVerEnunciado)
                .NotEmpty()
                .WithMessage("El enunciado es obligatorio.")
                .MaximumLength(2000)
                .WithMessage("El enunciado no puede exceder 2000 caracteres.");

            //---------------------------------------------------
            // DATASCHEMA
            //---------------------------------------------------
            RuleFor(x => x.banPreVerDataSchema)
                .NotEmpty()
                .WithMessage("El DataSchema es obligatorio.")
                .Must(BeValidJson)
                .WithMessage("El DataSchema debe ser un JSON válido.");

            //---------------------------------------------------
            // UISCHEMA
            //---------------------------------------------------
            RuleFor(x => x.banPreVerUiSchema)
                .Must(BeValidJsonOrEmpty)
                .WithMessage("El UiSchema debe ser un JSON válido.");

            //---------------------------------------------------
            // VALIDACIÓN POR TIPO 🔥
            //---------------------------------------------------
            RuleFor(x => x)
                .Custom((request, context) =>
                {
                    try
                    {
                        var json = JsonDocument.Parse(request.banPreVerDataSchema);
                        var root = json.RootElement;

                        switch (request.catIdTipo)
                        {
                            //-------------------------------------------------
                            // 8 - multiple_choice
                            //-------------------------------------------------
                            case 8:
                                Require(root, "options", context, "multiple_choice requiere 'options'");
                                Require(root, "correctAnswer", context, "multiple_choice requiere 'correctAnswer'");
                                break;

                            //-------------------------------------------------
                            // 9 - multiple_select
                            //-------------------------------------------------
                            case 9:
                                Require(root, "options", context, "multiple_select requiere 'options'");
                                Require(root, "correctAnswer", context, "multiple_select requiere 'correctAnswer'");
                                break;

                            //-------------------------------------------------
                            // 10 - true_false
                            //-------------------------------------------------
                            case 10:
                                Require(root, "options", context, "true_false requiere 'options'");
                                break;

                            //-------------------------------------------------
                            // 11 - likert
                            //-------------------------------------------------
                            case 11:
                                Require(root, "options", context, "likert requiere 'options'");
                                break;

                            //-------------------------------------------------
                            // 12 - semantic_differential
                            //-------------------------------------------------
                            case 12:
                                Require(root, "scale", context, "semantic_differential requiere 'scale'");
                                break;

                            //-------------------------------------------------
                            // 13 - rating_scale
                            //-------------------------------------------------
                            case 13:
                                Require(root, "scale", context, "rating_scale requiere 'scale'");
                                break;

                            //-------------------------------------------------
                            // 17 - numeric
                            //-------------------------------------------------
                            case 17:
                                Require(root, "correctAnswer", context, "numeric requiere 'correctAnswer'");
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
                                    Require(range, "min", context, "numeric_range requiere 'min'");
                                    Require(range, "max", context, "numeric_range requiere 'max'");
                                }
                                break;

                            //-------------------------------------------------
                            // 21 - code
                            //-------------------------------------------------
                            case 21:
                            {
                                if (!root.TryGetProperty("codigoBase", out var code) ||
                                    code.ValueKind == JsonValueKind.Null ||
                                    string.IsNullOrWhiteSpace(code.GetString()))
                                {
                                    context.AddFailure("code requiere 'codigoBase'");
                                }
                                break;
                            }

                            //-------------------------------------------------
                            // 22 - code_fix
                            //-------------------------------------------------
                            case 22:
                                Require(root, "buggyCode", context, "code_fix requiere 'buggyCode'");
                                break;

                            //-------------------------------------------------
                            // 23 - sql_query
                            //-------------------------------------------------
                            case 23:
                                Require(root, "expectedQuery", context, "sql_query requiere 'expectedQuery'");
                                break;

                            //-------------------------------------------------
                            // 24 - ordering
                            //-------------------------------------------------
                            case 24:
                                Require(root, "items", context, "ordering requiere 'items'");
                                Require(root, "correctOrder", context, "ordering requiere 'correctOrder'");
                                break;

                            //-------------------------------------------------
                            // 25 - matching
                            //-------------------------------------------------
                            case 25:
                                Require(root, "left", context, "matching requiere 'left'");
                                Require(root, "right", context, "matching requiere 'right'");
                                break;

                            //-------------------------------------------------
                            // DEFAULT
                            //-------------------------------------------------
                            default:
                                // tipos abiertos (texto, case, etc.)
                                break;
                        }
                    }
                    catch
                    {
                        context.AddFailure("Error al procesar el JSON del dataSchema.");
                    }
                });
        }

        //---------------------------------------------------
        // HELPERS 🔥
        //---------------------------------------------------
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

        private void Require(JsonElement element, string property, ValidationContext<CreateBancoPreguntaCommand> context, string message)
        {
            if (!element.TryGetProperty(property, out _))
            {
                context.AddFailure(message);
            }
        }
    }
}