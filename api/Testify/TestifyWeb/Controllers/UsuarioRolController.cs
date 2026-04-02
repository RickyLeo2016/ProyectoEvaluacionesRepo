using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.UsuarioRol.Commands;
using Testify.Application.Features.UsuarioRol.Queries;

namespace TestifyWeb.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioRolController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsuarioRolController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("ListarUsuarioRol/{usuId}")]
        public async Task<IActionResult> ListarUsuarioRol(long usuId, int pageNumber = 1, int pageSize = 10)
        {
            var query = new GetUsuarioRolQuery
            {
                usuId = usuId,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
            var response = await _mediator.Send(query);
            return Ok(response);
        }


        
        [HttpPost("AsignarRoles")]
        public async Task<IActionResult> AsignarRoles([FromBody] AssignUsuarioRolCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
