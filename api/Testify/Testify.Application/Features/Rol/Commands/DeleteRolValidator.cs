using FluentValidation;

namespace Testify.Application.Features.Rol.Commands
{
    public class DeleteRolValidator : AbstractValidator<DeleteRolCommand>
    {
        public DeleteRolValidator()
        {
            RuleFor(x => x.rolId)
                .NotEmpty().WithMessage("El código es obligatorio.");
        }
    }
}
