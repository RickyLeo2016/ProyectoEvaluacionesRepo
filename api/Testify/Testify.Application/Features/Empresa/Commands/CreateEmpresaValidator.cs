using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Features.TipoCatalogo.Commands;

namespace Testify.Application.Features.Empresa.Commands
{
    public class CreateEmpresaValidator : AbstractValidator<CreateEmpresaCommand>
    {
        public CreateEmpresaValidator()
        {

            RuleFor(x => x.empNombre)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(100).WithMessage("El nombre no puede exceder 100 caracteres.");
            RuleFor(x => x.empRuc)
                .NotEmpty().WithMessage("El ruc es obligatorio.")
                .MaximumLength(100).WithMessage("El ruc no puede exceder 20 caracteres.");

            RuleFor(x => x.empDireccion)
                .NotEmpty().WithMessage("La dirección es obligatoria.")
                .MaximumLength(200).WithMessage("La dirección no puede exceder 200 caracteres.");

            RuleFor(x => x.empEstado)
                .NotEmpty().WithMessage("El estado es obligatorio.")
                .Must(x => x == 1 || x == 2)
                .WithMessage("El estado debe ser '1' (Activo) o '2' (Inactivo).");

            RuleFor(x => x.usuIdReg)
                .GreaterThan(0).WithMessage("El usuario de registro debe ser mayor que cero.");
        }
    }
}

