using FluentValidation;

namespace Testify.Application.Features.Usuario.Commands
{
    public class CreateUsuarioValidator : AbstractValidator<CreateUsuarioCommand>
    {
        public CreateUsuarioValidator()
        {

            //RuleFor(x => x.Password)
            //    .NotEmpty().WithMessage("La contraseña es obligatoria.")
            //    .MinimumLength(8).WithMessage("La contraseña debe tener al menos 8 caracteres.")
            //    .MaximumLength(100).WithMessage("La contraseña no puede exceder 100 caracteres.")
            //    .Matches("[A-Z]").WithMessage("Debe contener al menos una letra mayúscula.")
            //    .Matches("[a-z]").WithMessage("Debe contener al menos una letra minúscula.")
            //    .Matches("[0-9]").WithMessage("Debe contener al menos un número.")
            //    .Matches("[^a-zA-Z0-9]").WithMessage("Debe contener al menos un carácter especial.");

            RuleFor(x => x.usuNombre)
                .NotEmpty().WithMessage("El nombre de usuario es obligatorio.")
                .MaximumLength(50).WithMessage("La nombre de usuario no puede exceder 50 caracteres.");

            RuleFor(x => x.usuEmail)
                .NotEmpty().WithMessage("El email es obligatorio.")
                .MaximumLength(200).WithMessage("El email no puede exceder 200 caracteres.")
                .EmailAddress().WithMessage("El formato del email no es válido.");

            RuleFor(x => x.usuPassHash)
                .NotEmpty().WithMessage("El hash de la contraseña no puede ser vacío.");

            RuleFor(x => x.empId)
               .GreaterThan(0).WithMessage("El código de la tipo de empresa debe ser mayor que cero.");


            RuleFor(x => x.usuDetDNI)
                .NotEmpty().WithMessage("La identificación es obligatoria.")
                .MaximumLength(20).WithMessage("La identificación no puede exceder 20 caracteres.");

            RuleFor(x => x.usuNombres)
                .NotEmpty().WithMessage("Los nombres son obligatorios.")
                .MaximumLength(100).WithMessage("Los nombres no puede exceder 100 caracteres.");

            RuleFor(x => x.usuApellidos)
                .NotEmpty().WithMessage("Los apellidos son obligatorios.")
                .MaximumLength(100).WithMessage("Los apellidos no puede exceder 100 caracteres.");

            RuleFor(x => x.usuCelular)
                .NotEmpty().WithMessage("El nro. celular es obligatorio.")
                .MaximumLength(15).WithMessage("El nro. celular no puede exceder 15 caracteres.");

            RuleFor(x => x.catIdEstado)
                .NotEmpty().WithMessage("El estado es obligatorio.")
                .Must(x => x == 1 || x == 2)
                .WithMessage("El estado debe ser 'A' (Activo) o 'I' (Inactivo).");

            RuleFor(x => x.usuIdReg)
                .GreaterThan(0).WithMessage("El usuario de registro debe ser mayor que cero.");
        }
    }
}
