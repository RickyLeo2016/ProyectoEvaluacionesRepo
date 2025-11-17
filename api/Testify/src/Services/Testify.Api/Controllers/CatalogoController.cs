using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.UseCase.UseCase.Catalogo.Commands.CreateCommand;
using Testify.Application.UseCase.UseCase.Catalogo.Commands.UpdateCommand;
//using Testify.Application.UseCase.UseCase.Catalogo.Commands.DeleteCommand;
//using Testify.Application.UseCase.UseCase.Catalogo.Queries.GetAllTipoCatalogo;
//using Testify.Application.UseCase.UseCase.Catalogo.Queries.GetByIdTipoCatalogo;

namespace Testify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogoController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CatalogoController(IMediator mediator)
        {
            _mediator = mediator;

        }

        //[HttpGet("ListarCatalogo")]
        //public async Task<IActionResult> ListarTipoCatalogo([FromQuery] GetAllCatalogoQuery query)
        //{
        //    var response = await _mediator.Send(query);
        //    return Ok(response);
        //}

        //[HttpGet("ListarByIdCatalogo/{tipCatId:int}")]
        //public async Task<IActionResult> ListarByIdCatalogo(int tipCatId)
        //{
        //    var response = await _mediator.Send(new GetByIdCatalogoQuery() { catId = catId });
        //    return Ok(response);
        //}


        [HttpPost("RegistrarCatalogo")]
        public async Task<IActionResult> RegistrarCatalogo([FromBody] CreateCatalogoCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpPut("EditarCatalogo")]
        public async Task<IActionResult> EditarCatalogo([FromBody] UpdateCatalogoCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        //[HttpDelete("EliminarCatalogo/{catId:int}")]
        //public async Task<IActionResult> DeleteCatalogo(int tipCatId)
        //{
        //    var response = await _mediator.Send(new DeleteCatalogoCommand() { catId = tipCatId });
        //    return Ok(response);
        //}
    }
}
