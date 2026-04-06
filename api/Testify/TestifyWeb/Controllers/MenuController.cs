using MediatR;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.Menu.Commands;
using Testify.Application.Features.Menu.Query;

namespace TestifyWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MenuController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("ListarMenu")]
        public async Task<IActionResult> ListarMenu(int pageNumber = 1, int pageSize = 10)
        {
            var query = new GetAllMenuQuery
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpPost("RegistrarMenu")]
        public async Task<IActionResult> RegistrarMenu(CreateMenuCommand cmd)
        {
            return Ok(await _mediator.Send(cmd));
        }


        [HttpPut("ActualizarMenu")]
        public async Task<IActionResult> ActualizarMenu([FromBody] UpdateMenuCommand cmd)
        {
            var response = await _mediator.Send(cmd);
            return Ok(response);
        }


        [HttpDelete("EliminarMenu/{id}")]
        public async Task<IActionResult> EliminarMenu(long id)
        {
            var command = new DeleteMenuCommand { menId = id };
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
