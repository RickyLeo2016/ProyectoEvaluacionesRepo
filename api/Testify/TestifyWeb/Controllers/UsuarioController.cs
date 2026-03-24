using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.Catalogo.Commands;
using Testify.Application.Features.Usuario.Commands;
using Testify.Application.Features.Usuario.Queries;

namespace TestifyWeb.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsuarioController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("ListarUsuario")]
        public async Task<IActionResult> ListarUsuario(int pageNumber = 1, int pageSize = 10)
        {
            var query = new GetAllUsuarioQuery
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            var response = await _mediator.Send(query);
            return Ok(response);
        }


        [HttpPost("RegistrarUsuario")]
        public async Task<IActionResult> RegistrarUsuario(CreateUsuarioCommand cmd)
        {

            var result = await _mediator.Send(cmd);
            return Ok(result);
        }

        [HttpPut("ActualizarUsuario")]
        public async Task<IActionResult> ActualizarUsuario(UpdateUsuarioCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(result);
        }



        [HttpDelete("EliminarUsuario/{id}")]
        public async Task<IActionResult> EliminarUsuario(long id)
        {
            var command = new DeleteUsuarioCommand
            {
                usuId = id,
            };
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
