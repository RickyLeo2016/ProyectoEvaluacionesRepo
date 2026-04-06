using FluentValidation;

namespace Testify.Application.Features.Menu.Commands
{
    public class UpdateMenuValidator : AbstractValidator<UpdateMenuCommand>
    {
        public UpdateMenuValidator()
        {

            RuleFor(x => x.menId)
                .NotEmpty().WithMessage("El código del menú es obligatorio.");

            RuleFor(x => x.menNombre)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(100).WithMessage("La nombre no puede exceder 100 caracteres.");

            RuleFor(x => x.menIcono)
               .NotEmpty().WithMessage("El icono es obligatorio.")
               .MaximumLength(50).WithMessage("La icono no puede exceder 50 caracteres.");

            RuleFor(x => x.menRuta)
               .NotEmpty().WithMessage("El ruta es obligatorio.")
               .MaximumLength(200).WithMessage("La ruta no puede exceder 200 caracteres.");

            RuleFor(x => x.menPadreId)
               .NotEmpty().WithMessage("El ruta código del menú padre es obligatorio.");

            RuleFor(x => x.menOrden)
               .NotEmpty().WithMessage("El orden es obligatorio.");

        }
    }
}
