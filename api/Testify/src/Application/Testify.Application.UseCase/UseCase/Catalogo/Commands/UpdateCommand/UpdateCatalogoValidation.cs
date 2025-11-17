using FluentValidation;

namespace Testify.Application.UseCase.UseCase.Catalogo.Commands.UpdateCommand
{
    public class UpdateCatalogoValidation : AbstractValidator<UpdateCatalogoCommand>
    {
        public UpdateCatalogoValidation()
        {

            RuleFor(x => x.catId).NotNull().WithMessage("El código del catálogo no puede se nulo.")
                 .NotEmpty().WithMessage("El código del catálogo no puede ser vacío.");

            RuleFor(x => x.tipCatId).NotNull().WithMessage("El código del tipo de catálogo no puede se nulo.")
                 .NotEmpty().WithMessage("El código del tipo de catálogo no puede ser vacío.");

            RuleFor(x => x.catNombre).NotNull().WithMessage("El campo nombre no puede se nulo.")
             .NotEmpty().WithMessage("El campo nombre no puede ser vacío.");

            RuleFor(x => x.catDescripcion).NotNull().WithMessage("El campo descripción no puede se nulo.")
             .NotEmpty().WithMessage("El campo descripción no puede ser vacío.");

            RuleFor(x => x.catEstado).NotNull().WithMessage("El campo estado no puede se nulo.")
                .NotEmpty().WithMessage("El campo estado no puede ser vacío.");
        }

    }
}
