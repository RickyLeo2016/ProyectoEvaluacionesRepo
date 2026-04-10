using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Text;
using Testify.Application.Common;
using Testify.Application.Interfaces;
using Testify.Infrastructure.Constants;
using Testify.Utilities.Constants;


namespace Testify.Application.Features.Usuario.Commands
{
    public class CreateUsuarioHandler : IRequestHandler<CreateUsuarioCommand, ApiResponse<bool>>
    {
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateUsuarioHandler(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _unit = unitOfWork;
        }

        public async Task<ApiResponse<bool>> Handle(CreateUsuarioCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var usuIdReg = _httpContextAccessor?.HttpContext?.User?.FindFirst("usuIdRegistro")?.Value;
                string nombres = request.usuNombres;
                string apellidos = request.usuApellidos;

                string passwordPlano = GenerarPasswordAleatoria();
                string passHash = GenerarPassHash(passwordPlano);

                int maxIntentos = 5;
                int intento = 0;

                while (intento < maxIntentos)
                {
                    intento++;

                    string nombreUsuario = GenerarNombreUsuario(nombres, apellidos, intento);

                    var parameters = new
                    {
                        usuEmail = request.usuEmail,
                        usuNombre = nombreUsuario,
                        usuPassHash = passHash,
                        empId = request.empId,
                        usuDetDNI = request.usuDetDNI,
                        usuNombres = nombres,
                        usuApellidos = apellidos,
                        usuTelefono = request.usuTelefono,
                        usuCelular = request.usuCelular,
                        catIdEstado = request.catIdEstado,
                        usuIdReg = usuIdReg
                    };

                    var result = await _unit.Usuario.QuerySingleAsync<SpResponse<long>>(SP.spCrearUsuario, parameters);

                    if (result.Codigo == "0000")
                    {
                        return new ApiResponse<bool>(
                            data: true,
                            message: $"Usuario creado: {nombreUsuario}",
                            isSuccess: true
                        );
                    }

                    if (result.Codigo != "0000") // Errores de registro
                    {
                        return new ApiResponse<bool>(
                            data: false,
                            message: result.Mensaje,
                            isSuccess: false
                        );
                    }
                }

                return new ApiResponse<bool>(
                    data: false,
                    message: "No se pudo generar un nombre de usuario único",
                    isSuccess: false
                );
            }
            catch (SqlException ex)
            {
                return new ApiResponse<bool>(false, $"Error de base de datos: {ex.Message}", false);
            }
            catch (Exception ex)
            {
                return new ApiResponse<bool>(false, $"Error inesperado: {ex.Message}", false);
            }
        }


        private string GenerarNombreUsuario(string nombres, string apellidos, int intento = 0)
        {
            var primerNombre = nombres.Trim().Split(' ')[0];
            var primerApellido = apellidos.Trim().Split(' ')[0];

            string baseUsuario = (primerNombre.Substring(0, 1) + primerApellido).ToLower();

            if (intento == 1)
                return baseUsuario;

            return $"{baseUsuario}{new Random().Next(10, 99)}";
        }

        private string GenerarPasswordAleatoria(int length = 10)
        {
            const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%";
            var password = new StringBuilder();
            var random = new Random();

            for (int i = 0; i < length; i++)
            {
                password.Append(validChars[random.Next(validChars.Length)]);
            }

            return password.ToString();
        }

        private string GenerarPassHash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
