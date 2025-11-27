using MediatR;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.Empresa.Commands;

namespace TestifyWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EmpresaController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //[HttpGet("ListarTipoCatalogo")]
        //public async Task<IActionResult> ListarTipoCatalogo(int pageNumber = 1, int pageSize = 10)
        //{
        //    var query = new GetAllTipoCatalogoQuery
        //    {
        //        PageNumber = pageNumber,
        //        PageSize = pageSize
        //    };

        //    var response = await _mediator.Send(query);
        //    return Ok(response);
        //}

        //[HttpGet("ObtenerTipoCatalogo/{id}")]
        //public async Task<IActionResult> ObtenerTipoCatalogo(long id)
        //{
        //    var query = new GetTipoCatalogoByIdQuery { tipCatId = id };
        //    var result = await _mediator.Send(query);
        //    return Ok(result);
        //}


        [HttpPost("RegistrarEmpresa")]
        public async Task<IActionResult> RegistrarEMpresa(CreateEmpresaCommand cmd)
        {
            return Ok(await _mediator.Send(cmd));
        }


        //[HttpPut("ActualizarTipoCatalogo")]
        //public async Task<IActionResult> ActualizarTipoCatalogo([FromBody] UpdateTipoCatalogoCommand cmd)
        //{
        //    var response = await _mediator.Send(cmd);
        //    return Ok(response);
        //}


        //[HttpDelete("EliminarTipoCatalogo/{id}")]
        //public async Task<IActionResult> EliminarTipoCatalogo(long id)
        //{
        //    var command = new DeleteTipoCatalogoCommand { tipCatId = id };
        //    var result = await _mediator.Send(command);
        //    return Ok(result);
        //}
    }
}
