using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Application.Features.UsuarioRol.Commands
{
    public class AssignUsuarioRolValidator : AbstractValidator<AssignUsuarioRolCommand>
    {
        public AssignUsuarioRolValidator()
        {
            RuleFor(x => x.usuId)
                .GreaterThan(0).WithMessage("El código del Usuario debe ser mayor a 0.");

            RuleFor(x => x.roles)
                .NotNull().WithMessage("La lista de roles no puede ser nula.")
                .NotEmpty().WithMessage("Debe enviar al menos un rol.")
                .Must(roles => roles
                .GroupBy(r => r.rolId)
                .All(g => g.Count() == 1))
                .WithMessage("No se permiten roles duplicados.");

            RuleForEach(x => x.roles)
                .SetValidator(new RolDtoValidator()); // Valida por Rol
        }
    }
}