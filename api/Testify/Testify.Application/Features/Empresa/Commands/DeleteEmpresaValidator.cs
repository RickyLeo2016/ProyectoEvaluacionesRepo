using FluentValidation;

namespace Testify.Application.Features.Empresa.Commands
{
    public class DeleteEmpresaValidator : AbstractValidator<DeleteEmpresaCommand>
    {
        public DeleteEmpresaValidator()
        {
            RuleFor(x => x.empId)
               .GreaterThan(0).WithMessage("El código de la empresa debe ser mayor que cero.");
        }
    }
}

