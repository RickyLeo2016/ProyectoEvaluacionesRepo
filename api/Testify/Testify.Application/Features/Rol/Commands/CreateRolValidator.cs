using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Features.Catalogo.Commands;

namespace Testify.Application.Features.Rol.Commands
{
    public class CreateRolValidator : AbstractValidator<CreateRolCommand>
    {
        public CreateRolValidator()
        {
            RuleFor(x => x.rolNombre)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(100).WithMessage("La nombre no puede exceder 100 caracteres.");

        }
    }
}
