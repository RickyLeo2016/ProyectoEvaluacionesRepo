using Testify.Application.Interfaces;
using Testify.Infrastructure.Services;
using TestifyWeb.Extensions;
using TestifyWeb.Middleware;

var builder = WebApplication.CreateBuilder(args);

// --- Limpieza total ---
builder.Services.AddControllers();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddSwaggerWithJwt();

// MediatR, FluentValidation, Repositorios, etc.
builder.Services.AddApplicationServices(); 

builder.Services.AddScoped<IJwtService, JwtService>();

var app = builder.Build();

// Middleware de errores
app.UseErrorHandlingMiddleware();

app.UseSwaggerWithUi(app.Environment);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
