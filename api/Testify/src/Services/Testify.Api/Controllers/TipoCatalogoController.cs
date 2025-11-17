using Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.CreateCommand;
using Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.DeleteCommand;
using Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.UpdateCommand;
using Testify.Application.UseCase.UseCase.TipoCatalogo.Queries.GetAllTipoCatalogo;
using Testify.Application.UseCase.UseCase.TipoCatalogo.Queries.GetByIdTipoCatalogo;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Testify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoCatalogoController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TipoCatalogoController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet("ListarTipoCatalogo")]
        public async Task<IActionResult> ListarTipoCatalogo([FromQuery] GetAllTipoCatalogoQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("ListarByIdTipoCatalogo/{tipCatId:int}")]
        public async Task<IActionResult> ListarByIdTipoCatalogo(int tipCatId)
        {
            var response = await _mediator.Send(new GetByIdTipoCatalogoQuery() { tipCatId = tipCatId });
            return Ok(response);
        }


        [HttpPost("RegistrarTipoCatalogo")]
        public async Task<IActionResult> RegistrarTipoCatalogo([FromBody] CreateTipoCatalogoCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpPut("EditarTipoCatalogo")]
        public async Task<IActionResult> EditarTipoCatalogo([FromBody] UpdateTipoCatalogoCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }
        [HttpDelete("EliminarTipoCatalogo/{tipCatId:int}")]
        public async Task<IActionResult> DeleteTipoCatalogo(int tipCatId)
        {
            var response = await _mediator.Send(new DeleteTipoCatalogoCommand() { tipCatId = tipCatId });
            return Ok(response);
        }
    }
}
