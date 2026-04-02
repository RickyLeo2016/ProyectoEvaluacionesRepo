using FluentValidation;
using Testify.Application.Dtos;

namespace Testify.Application.Features.UsuarioRol.Commands
{
    public class RolDtoValidator : AbstractValidator<AssignUsuarioRolDto>
    {
        public RolDtoValidator()
        {
            RuleFor(x => x.rolId)
                .GreaterThan(0)
                .WithMessage("El rolId debe ser mayor a 0.");

            RuleFor(x => x.rolSelec)
                .Must(x => x == 1 || x == 2)
                .WithMessage("El rolSelec debe ser 1 (activo) o 2 (inactivo).");
        }
    }
}
