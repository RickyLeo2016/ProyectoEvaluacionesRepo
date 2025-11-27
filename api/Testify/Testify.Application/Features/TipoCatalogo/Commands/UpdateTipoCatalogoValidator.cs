using FluentValidation;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class UpdateTipoCatalogoValidator : AbstractValidator<UpdateTipoCatalogoCommand>
    {
        public UpdateTipoCatalogoValidator()
        {
            RuleFor(x => x.tipCatId)
                .GreaterThan(0)
                .WithMessage("El Id del tipo de catálogo debe ser mayor que cero.");

            RuleFor(x => x.tipCatDescripcion)
                .NotEmpty()
                .WithMessage("La descripción es obligatoria.");

            RuleFor(x => x.tipCatEstado)
                .NotEmpty()
                .WithMessage("El estado es obligatorio.");

            RuleFor(x => x.usuIdReg)
                .GreaterThan(0)
                .WithMessage("El usuario que modifica debe ser mayor que cero.");
        }
    }
}
