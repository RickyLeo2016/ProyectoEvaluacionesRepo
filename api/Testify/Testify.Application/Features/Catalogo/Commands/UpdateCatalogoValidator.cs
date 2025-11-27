using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testify.Application.Features.Catalogo.Commands
{
    public class UpdateCatalogoValidator : AbstractValidator<UpdateCatalogoCommand>
    {
        public UpdateCatalogoValidator() 
        {
            RuleFor(x => x.catId)
            .GreaterThan(0).WithMessage("El código del catálogo debe ser mayor que cero.");

            RuleFor(x => x.tipCatId)
               .GreaterThan(0).WithMessage("El código del tipo de catálogo debe ser mayor que cero.");

            RuleFor(x => x.catNombre)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(100).WithMessage("La nombre no puede exceder 100 caracteres.");

            RuleFor(x => x.catDescripcion)
                .NotEmpty().WithMessage("La descripción es obligatoria.")
                .MaximumLength(200).WithMessage("La descripción no puede exceder 200 caracteres.");

            RuleFor(x => x.catEstado)
                .NotEmpty().WithMessage("El estado es obligatorio.")
                .Must(x => x == "A" || x == "I")
                .WithMessage("El estado debe ser 'A' (Activo) o 'I' (Inactivo).");

            RuleFor(x => x.usuIdReg)
                .GreaterThan(0).WithMessage("El usuario de registro debe ser mayor que cero.");

        }
    }
}
