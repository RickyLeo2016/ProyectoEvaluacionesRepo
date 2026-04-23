using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.BancoPregunta.Commands;
using Testify.Application.Features.BancoPregunta.Queries;

namespace TestifyWeb.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BancoPreguntaController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BancoPreguntaController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("CrearBancoPregunta")]
        public async Task<IActionResult> RegistrarCatalogo(CreateBancoPreguntaCommand cmd)
        {
            return Ok(await _mediator.Send(cmd));
        }

        [HttpPost("CrearVersionPregunta")]
        public async Task<IActionResult> CrearVersionPregunta(CreateBancoPreguntaVersionCommand cmd)
        {
            return Ok(await _mediator.Send(cmd));
        }

        [HttpGet("ListarBancoPregunta")]
        public async Task<IActionResult> ListarBancoPregunta([FromQuery] GetBancoPreguntaVersionQuery query)
        {
            return Ok(await _mediator.Send(query));
        }


    }
}
