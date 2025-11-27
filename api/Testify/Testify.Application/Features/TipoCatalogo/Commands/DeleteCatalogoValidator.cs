using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Testify.Application.Features.Catalogo.Commands;

namespace Testify.Application.Features.TipoCatalogo.Commands
{
    public class DeleteCatalogoValidator : AbstractValidator<UpdateCatalogoCommand>
    {
        public DeleteCatalogoValidator() 
        {

            RuleFor(x => x.catId)
           .GreaterThan(0).WithMessage("El código del catálogo debe ser mayor que cero.");

            RuleFor(x => x.usuIdReg)
                .GreaterThan(0).WithMessage("El usuario de registro debe ser mayor que cero.");

        }


    }
}
