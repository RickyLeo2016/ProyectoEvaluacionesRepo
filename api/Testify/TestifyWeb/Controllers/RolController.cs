using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.Rol.Commands;


namespace TestifyWeb.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RolController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //[HttpGet("ListarRol")]
        //public async Task<IActionResult> ListarRol(int pageNumber = 1, int pageSize = 10)
        //{
        //    var query = new GetAllRolQuery
        //    {
        //        PageNumber = pageNumber,
        //        PageSize = pageSize
        //    };

        //    var response = await _mediator.Send(query);
        //    return Ok(response);
        //}


        [HttpPost("RegistrarRol")]
        public async Task<IActionResult> RegistrarRol(CreateRolCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(result);
        }

        [HttpPut("ActualizarRol")]
        public async Task<IActionResult> ActualizarRol(UpdateRolCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(result);
        }



        [HttpDelete("EliminarRol/{id}")]
        public async Task<IActionResult> EliminarRol(long id)
        {
            var command = new DeleteRolCommand
            {
                rolId = id,
            };
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
