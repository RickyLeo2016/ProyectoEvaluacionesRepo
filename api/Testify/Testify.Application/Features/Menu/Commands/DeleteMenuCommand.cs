using MediatR;
using Testify.Application.Common;

namespace Testify.Application.Features.Menu.Commands
{
    public class DeleteMenuCommand : IRequest<ApiResponse<bool>>
    {
        public long? menId { get; init; }
    }
}
