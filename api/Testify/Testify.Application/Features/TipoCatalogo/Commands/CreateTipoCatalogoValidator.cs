
using FluentValidation;
using Testify.Application.Features.TipoCatalogo.Commands;

namespace Testify.Application.Features.TipoCatalogo.Validators
{
    public class CreateTipoCatalogoValidator : AbstractValidator<CreateTipoCatalogoCommand>
    {
        public CreateTipoCatalogoValidator()
        {
            RuleFor(x => x.tipCatDescripcion)
                .NotEmpty().WithMessage("La descripción es obligatoria.")
                .MaximumLength(200).WithMessage("La descripción no puede exceder 200 caracteres.");

            RuleFor(x => x.tipCatEstado)
                .NotEmpty().WithMessage("El estado es obligatorio.")
                .Must(x => x == "A" || x == "I")
                .WithMessage("El estado debe ser 'A' (Activo) o 'I' (Inactivo).");
            
            RuleFor(x => x.usuIdReg)
                .GreaterThan(0).WithMessage("El usuario de registro debe ser mayor que cero.");
        }
    }
}

