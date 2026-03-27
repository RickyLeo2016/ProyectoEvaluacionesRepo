using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Application.Features.Rol.Commands
{
    public class UpdateRolValidator : AbstractValidator<UpdateRolCommand>
    {
        public UpdateRolValidator()
        {
            RuleFor(x => x.rolNombre)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(100).WithMessage("La nombre no puede exceder 100 caracteres.");

            RuleFor(x => x.catIdEstado)
                .NotEmpty().WithMessage("El estado es obligatorio.")
                .Must(x => x == 1 || x == 2)
                .WithMessage("El estado debe ser Activo o Inactivo.");
        }
    }
}
