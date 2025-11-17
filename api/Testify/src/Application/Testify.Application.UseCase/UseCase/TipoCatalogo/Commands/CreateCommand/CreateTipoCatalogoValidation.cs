using FluentValidation;

namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.CreateCommand
{
    public class CreateTipoCatalogoValidation : AbstractValidator<CreateTipoCatalogoCommand>
    {
        public CreateTipoCatalogoValidation()
        {
            RuleFor(x => x.tipCatDescripcion).NotNull().WithMessage("El campo descripción no puede se nulo.")
             .NotEmpty().WithMessage("El campo descripción no puede ser vacío.");
            RuleFor(x => x.tipCatEstado).NotNull().WithMessage("El campo estado no puede se nulo.")
                .NotEmpty().WithMessage("El campo estado no puede ser vacío.");

        }

    }
}
