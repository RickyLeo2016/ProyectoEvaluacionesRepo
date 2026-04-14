using FluentValidation;
using Testify.Application.Dtos;

namespace Testify.Application.Features.Menu.Commands
{
    public class MenuRolDtoValidator : AbstractValidator<AssignMenuRolDto>
    {
        public MenuRolDtoValidator()
        {
            RuleFor(x => x.menId)
                .GreaterThan(0)
                .WithMessage("El menId debe ser mayor a 0.");

            RuleFor(x => x.menSelec)
                .Must(x => x == 1 || x == 2)
                .WithMessage("El menSelec debe ser 1 (activo) o 2 (inactivo).");
        }
    }
}
