using FluentValidation;

namespace Testify.Application.Features.Menu.Commands
{
    public class DeleteMenuValidator : AbstractValidator<DeleteMenuCommand>
    {
        public DeleteMenuValidator()
        {

            RuleFor(x => x.menId)
                .NotEmpty().WithMessage("El código del menú es obligatorio.");
        }
    }
}
