using MediatR;
using Testify.Application.UseCase.Commons.Bases;

namespace Testify.Application.UseCase.UseCase.Catalogo.Commands.CreateCommand
{
    public class CreateCatalogoCommand : IRequest<BaseResponse<bool>>
    {
        public int? tipCatId { get; set; }
        public string? catNombre { get; set; }
        public string? catDescripcion { get; set; }
        public string? catEstado { get; set; }
        public int? usuIdReg { get; set; } = 0;
    }
}
