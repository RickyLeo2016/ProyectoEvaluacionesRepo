using FluentValidation;

namespace Testify.Application.Features.Menu.Commands
{
    public class AssignMenuRolValidator : AbstractValidator<AssignMenuRolCommand>
    {
        public AssignMenuRolValidator()
        {
            RuleFor(x => x.rolId)
                .GreaterThan(0).WithMessage("El código del Rol debe ser mayor a 0.");

            RuleFor(x => x.menus)
                .NotNull().WithMessage("La lista de menús no puede ser nula.")
                .NotEmpty().WithMessage("Debe enviar al menos un menú.")
                .Must(menus => menus
                .GroupBy(m => m.menId)
                .All(g => g.Count() == 1))
                .WithMessage("No se permiten menús duplicados.");

            RuleForEach(x => x.menus)
                .SetValidator(new MenuRolDtoValidator()); // Valida por Menus
        }
    }
}