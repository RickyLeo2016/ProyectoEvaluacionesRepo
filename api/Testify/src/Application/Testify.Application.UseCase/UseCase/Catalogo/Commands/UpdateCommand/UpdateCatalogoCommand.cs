using MediatR;
using Testify.Application.UseCase.Commons.Bases;

namespace Testify.Application.UseCase.UseCase.Catalogo.Commands.UpdateCommand
{
    public class UpdateCatalogoCommand : IRequest<BaseResponse<bool>>
    {
        public int? catId { get; set; }
        public int? tipCatId { get; set; }
        public string? catNombre { get; set; }
        public string? catDescripcion { get; set; }
        public string? catEstado { get; set; }
        public int? usuIdReg { get; set; } = 0;
    }
}
