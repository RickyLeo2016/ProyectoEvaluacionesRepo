using MediatR;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.Catalogo.Commands;
using Testify.Application.Features.Catalogo.Queries;

namespace TestifyWeb.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogoController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CatalogoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("ListarCatalogo")]
        public async Task<IActionResult> ListarCatalogo(int pageNumber = 1, int pageSize = 10)
        {
            var query = new GetAllCatalogoQuery
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("ObtenerCatalogo/{id}")]
        public async Task<IActionResult> ObtenerCatalogo(long id)
        {
            var query = new GetCatalogoByIdQuery { catId = id };
            var result = await _mediator.Send(query);
            return Ok(result);
        }


        [HttpPost("RegistrarCatalogo")]
        public async Task<IActionResult> RegistrarCatalogo(CreateCatalogoCommand cmd)
        {
            return Ok(await _mediator.Send(cmd));
        }


        [HttpPut("ActualizarCatalogo")]
        public async Task<IActionResult> ActualizarCatalogo([FromBody] UpdateCatalogoCommand cmd)
        {
            var response = await _mediator.Send(cmd);
            return Ok(response);
        }


        [HttpDelete("EliminarCatalogo/{id}")]
        public async Task<IActionResult> EliminarCatalogo(long id)
        {
            var command = new DeleteCatalogoCommand { catId = id };
            var result = await _mediator.Send(command);
            return Ok(result);
        }


    }
}
