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
                                {
                                    Require(root, "options", context, "true_false requiere 'options'");

                                    if (!root.TryGetProperty("options", out var optionsTf))
                                    {
                                        context.AddFailure("true_false requiere 'options'");
                                        break;
                                    }

                                    // Validar que sea array con exactamente 2 opciones
                                    if (optionsTf.ValueKind != JsonValueKind.Array)
                                    {
                                        context.AddFailure("'options' debe ser un array");
                                        break;
                                    }

                                    if (optionsTf.GetArrayLength() != 2)
                                    {
                                        context.AddFailure("true_false debe tener exactamente 2 opciones");
                                        break;
                                    }

                                    bool hasCorrect = false;

                                    foreach (var opt in optionsTf.EnumerateArray())
                                    {
                                        // validar estructura mínima
                                        if (!opt.TryGetProperty("text", out var textProp) ||
                                            string.IsNullOrWhiteSpace(textProp.GetString()))
                                        {
                                            context.AddFailure("Cada opción debe tener 'text'");
                                        }

                                        if (!opt.TryGetProperty("value", out _))
                                        {
                                            context.AddFailure("Cada opción debe tener 'value'");
                                        }

                                        if (!opt.TryGetProperty("isCorrect", out var isCorrectProp))
                                        {
                                            context.AddFailure("Cada opción debe tener 'isCorrect'");
                                            continue;
                                        }

                                        if (isCorrectProp.ValueKind == JsonValueKind.True)
                                        {
                                            hasCorrect = true;
                                        }
                                    }

                                    // debe existir una única correcta
                                    var correctCount = optionsTf.EnumerateArray()
                                        .Count(o => o.TryGetProperty("isCorrect", out var c) && c.GetBoolean());

                                    if (correctCount != 1)
                                    {
                                        context.AddFailure("Debe existir exactamente una respuesta correcta");
                                    }

                                    break;
                                }

                            //-------------------------------------------------
                            // 11 - likert
                            //-------------------------------------------------
                            case 11:

                                if (!root.TryGetProperty("options", out var options))
                                {
                                    context.AddFailure("likert requiere 'options'");
                                    break;
                                }

                                if (options.ValueKind != JsonValueKind.Array || options.GetArrayLength() < 2)
                                {
                                    context.AddFailure("likert requiere al menos 2 opciones");
                                    break;
                                }

                                foreach (var item in options.EnumerateArray())
                                {
                                    if (!item.TryGetProperty("label", out var label) ||
                                        string.IsNullOrWhiteSpace(label.GetString()))
                                    {
                                        context.AddFailure("Todas las opciones deben tener 'label'");
                                    }

                                    if (!item.TryGetProperty("value", out _))
                                    {
                                        context.AddFailure("Todas las opciones deben tener 'value'");
                                    }
                                }

                            break;

                            //-------------------------------------------------
                            // 12 - semantic_differential
                            //-------------------------------------------------
                            case 12:

                                Require(root, "scale", context, "semantic_differential requiere 'scale'");
                                Require(root, "items", context, "semantic_differential requiere 'items'");

                                var items = root.GetProperty("items");

                                if (items.GetArrayLength() == 0)
                                {
                                    context.AddFailure("semantic_differential requiere al menos un item");
                                }

                                break;

                            //-------------------------------------------------
                            // 13 - rating_scale
                            //-------------------------------------------------
                            case 13:

                                if (!root.TryGetProperty("min", out var minProp) ||
                                    !root.TryGetProperty("max", out var maxProp))
                                {
                                    context.AddFailure("rating_scale requiere 'min' y 'max'");
                                    break;
                                }

                                var min = minProp.GetInt32();
                                var max = maxProp.GetInt32();

                                if (min >= max)
                                {
                                    context.AddFailure("rating_scale: 'min' debe ser menor que 'max'");
                                }

                                break;


                            //-------------------------------------------------
                            // 16 - structured_text
                            //-------------------------------------------------
                            case 16:

                                // root YA ES el dataSchema
                                Require(root, "type", context, "structured_text requiere 'type'");
                                Require(root, "properties", context, "structured_text requiere 'properties'");

                                if (root.GetProperty("type").GetString() != "object")
                                {
                                    context.AddFailure("'type' debe ser 'object'");
                                }

                                var props = root.GetProperty("properties");

                                if (!props.TryGetProperty("respuesta", out var respuesta))
                                {
                                    context.AddFailure("structured_text requiere propiedad 'respuesta'");
                                    break;
                                }

                                if (!respuesta.TryGetProperty("type", out var typeProp) ||
                                    typeProp.GetString() != "string")
                                {
                                    context.AddFailure("'respuesta' debe ser tipo string");
                                }

                                if (respuesta.TryGetProperty("minLength", out var minPropSt) &&
                                    minPropSt.GetInt32() < 0)
                                {
                                    context.AddFailure("minLength inválido");
                                }

                                if (respuesta.TryGetProperty("maxLength", out var maxPropSt) &&
                                    maxPropSt.GetInt32() <= 0)
                                {
                                    context.AddFailure("maxLength inválido");
                                }

                                if (respuesta.TryGetProperty("minLength", out var minP) &&
                                    respuesta.TryGetProperty("maxLength", out var maxP))
                                {
                                    if (maxP.GetInt32() <= minP.GetInt32())
                                    {
                                        context.AddFailure("maxLength debe ser mayor que minLength");
                                    }
                                }

                                break;

                            //-------------------------------------------------
                            // 17 - numeric
                            //-------------------------------------------------
                            case 17:
                                {
                                    // 🔥 Asegurar que es objeto
                                    if (root.ValueKind != JsonValueKind.Object)
                                    {
                                        context.AddFailure("dataSchema inválido para numeric");
                                        break;
                                    }

                                    // 🔥 correctAnswer obligatorio
                                    if (!root.TryGetProperty("correctAnswer", out var answerProp))
                                    {
                                        context.AddFailure("numeric requiere 'correctAnswer'");
                                        break;
                                    }

                                    // 🔥 validar tipo
                                    if (answerProp.ValueKind != JsonValueKind.Number)
                                    {
                                        context.AddFailure("'correctAnswer' debe ser numérico");
                                    }

                                    break;
                                }
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
                            // 19 - situational_judgment
                            //-------------------------------------------------
                            case 19:

                                Require(root, "properties", context, "requiere 'properties'");

                                var propsSj = root.GetProperty("properties");

                                if (!propsSj.TryGetProperty("options", out var optionsSj))
                                {
                                    context.AddFailure("requiere 'options'");
                                    break;
                                }

                                if (optionsSj.GetProperty("type").GetString() != "array")
                                {
                                    context.AddFailure("'options' debe ser array");
                                }

                                break;


                            //-------------------------------------------------
                            // 20 - case_study
                            //-------------------------------------------------
                            case 20:

                                Require(root, "properties", context, "requiere properties");

                                var propsCs = root.GetProperty("properties");

                                if (!propsCs.TryGetProperty("respuesta", out var resp))
                                {
                                    context.AddFailure("requiere respuesta");
                                    break;
                                }

                                if (resp.GetProperty("type").GetString() != "string")
                                {
                                    context.AddFailure("respuesta debe ser string");
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
                            {
                                if (!root.TryGetProperty("buggyCode", out var code) ||
                                    code.ValueKind == JsonValueKind.Null ||
                                    string.IsNullOrWhiteSpace(code.GetString()))
                                {
                                    context.AddFailure("code_fix requiere 'buggyCode'");
                                }
                                break;
                            }

                            //-------------------------------------------------
                            // 23 - sql_query
                            //-------------------------------------------------
                            case 23:

                                Require(root, "baseQuery", context, "sql_query requiere 'baseQuery'");
                                Require(root, "solutionQuery", context, "sql_query requiere 'solutionQuery'");

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
                                Require(root, "correctPairs", context, "matching requiere 'correctPairs'");

                                break;

                            case 26:
                                Require(root, "items", context, "drag_drop_order requiere 'items'");
                                items = root.GetProperty("items");
                                if (items.GetArrayLength() < 2)
                                {
                                    context.AddFailure("drag_drop_order requiere al menos 2 elementos");
                                }

                                break;

                            case 27:

                                Require(root, "left", context, "drag_drop_match requiere 'left'");
                                Require(root, "right", context, "drag_drop_match requiere 'right'");
                                Require(root, "correctPairs", context, "drag_drop_match requiere 'correctPairs'");

                                break;

                            //-------------------------------------------------
                            // 28 - pattern_recognition
                            //-------------------------------------------------
                            case 28:

                                Require(root, "properties", context, "requiere properties");

                                var propsPr = root.GetProperty("properties");

                                if (!propsPr.TryGetProperty("respuesta", out var respPr))
                                {
                                    context.AddFailure("requiere respuesta");
                                    break;
                                }

                                // 🔥 obtener patternType desde default
                                if (!root.TryGetProperty("default", out var def))
                                {
                                    context.AddFailure("requiere default");
                                    break;
                                }

                                var patternType = def.GetProperty("patternType").GetString();

                                // 🔥 mapear tipo esperado
                                var expectedType = patternType switch
                                {
                                    "number" => "number",
                                    "letter" => "string",
                                    "image" => "string",
                                    _ => "string"
                                };

                                var actualType = respPr.GetProperty("type").GetString();

                                if (actualType != expectedType)
                                {
                                    context.AddFailure($"respuesta debe ser {expectedType}");
                                }

                                break;


                            //-------------------------------------------------
                            // 29 - matrix_reasoning (SIEMPRE MULTI)
                            //-------------------------------------------------
                            case 29:

                                Require(root, "type", context, "matrix requiere 'type'");
                                Require(root, "matrix", context, "matrix requiere 'matrix'");
                                Require(root, "missingPositions", context, "requiere 'missingPositions'");
                                Require(root, "answers", context, "requiere 'answers'");

                                var missing = root.GetProperty("missingPositions");
                                var answers = root.GetProperty("answers");

                                if (missing.GetArrayLength() == 0)
                                    context.AddFailure("Debe existir al menos una incógnita");

                                if (answers.GetArrayLength() == 0)
                                    context.AddFailure("Debe definir respuestas");

                                if (missing.GetArrayLength() != answers.GetArrayLength())
                                    context.AddFailure("Cada incógnita debe tener una respuesta");

                                foreach (var ans in answers.EnumerateArray())
                                {
                                    if (!ans.TryGetProperty("row", out _)
                                        || !ans.TryGetProperty("col", out _)
                                        || !ans.TryGetProperty("value", out _))
                                    {
                                        context.AddFailure("Respuesta inválida");
                                    }
                                }

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