using MediatR;
using Microsoft.AspNetCore.Mvc;
using Testify.Application.Features.Empresa.Commands;
using Testify.Application.Features.Empresa.Queries;

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

        [HttpGet("ListarEmpresa")]
        public async Task<IActionResult> ListarEmpresa(int pageNumber = 1, int pageSize = 10)
        {
            var query = new GetAllEmpresaQuery
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("ObtenerEmpresa/{id}")]
        public async Task<IActionResult> ObtenerEmpresa(long id)
        {
            var query = new GetEmpresaByIdQuery { empId = id };
            var result = await _mediator.Send(query);
            return Ok(result);
        }


        [HttpPost("RegistrarEmpresa")]
        public async Task<IActionResult> RegistrarEMpresa(CreateEmpresaCommand cmd)
        {
            return Ok(await _mediator.Send(cmd));
        }


        [HttpPut("ActualizarEmpresa")]
        public async Task<IActionResult> ActualizarEmpresa([FromBody] UpdateEmpresaCommand cmd)
        {
            var response = await _mediator.Send(cmd);
            return Ok(response);
        }


        [HttpDelete("EliminarEmpresa/{id}")]
        public async Task<IActionResult> EliminarEmpresa(long id)
        {
            var command = new DeleteEmpresaCommand { empId = id };
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
