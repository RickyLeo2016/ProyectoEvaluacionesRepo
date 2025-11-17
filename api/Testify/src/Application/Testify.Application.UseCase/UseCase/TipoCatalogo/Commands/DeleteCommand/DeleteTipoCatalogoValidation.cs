using FluentValidation;
namespace Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.DeleteCommand
{
    public class DeleteTipoCatalogoValidation : AbstractValidator<DeleteTipoCatalogoCommand>
    {
        public DeleteTipoCatalogoValidation()
        {
            RuleFor(x => x.tipCatId).NotNull().WithMessage("El campo ID no puede se nulo.")
            .NotEmpty().WithMessage("El campo ID no puede ser vacío.");
        }
    }
}
