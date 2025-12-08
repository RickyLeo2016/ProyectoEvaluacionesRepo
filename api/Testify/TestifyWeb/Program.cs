//using Testify.Application.Interfaces;
//using Testify.Infrastructure.Services;
//using TestifyWeb.Extensions;
//using TestifyWeb.Middleware;

//var builder = WebApplication.CreateBuilder(args);

//// CORS, servicios, etc...
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", policy =>
//    {
//        policy.AllowAnyOrigin()
//              .AllowAnyHeader()
//              .AllowAnyMethod();
//    });
//});

//// --- Limpieza total ---
//builder.Services.AddControllers();
//builder.Services.AddJwtAuthentication(builder.Configuration);
//builder.Services.AddSwaggerWithJwt();

//// MediatR, FluentValidation, Repositorios, etc.
//builder.Services.AddApplicationServices(); 

//builder.Services.AddScoped<IJwtService, JwtService>();

//var app = builder.Build();

//// Middleware de errores
//app.UseErrorHandlingMiddleware();

//app.UseSwaggerWithUi(app.Environment);

//app.UseHttpsRedirection();

//app.UseRouting();
//app.UseCors("AllowAll");

//app.Use(async (context, next) =>
//{
//    await next();

//    // Si el status es 401 o 403 — añadir cabeceras CORS manualmente
//    if (context.Response.StatusCode == 401 || context.Response.StatusCode == 403)
//    {
//        context.Response.Headers["Access-Control-Allow-Origin"] = "*";
//        context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
//        context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
//    }
//});


//app.UseAuthentication();
//app.UseAuthorization();
//app.MapControllers();
//app.Run();

using Testify.Application.Interfaces;
using Testify.Infrastructure.Services;
using TestifyWeb.Extensions;
using TestifyWeb.Middleware;

// --- builder ---
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });

});


// Registrar servicios normales: controladores, autenticación, swagger, dependencias, repositorios, etc.
builder.Services.AddControllers();
builder.Services.AddJwtAuthentication(builder.Configuration);   // tu método de JWT
builder.Services.AddSwaggerWithJwt();
builder.Services.AddApplicationServices();
builder.Services.AddScoped<IJwtService, JwtService>();

var app = builder.Build();

// Middleware pipeline

// Opcional: manejo global de errores (tu middleware custom, si lo necesitas)
app.UseErrorHandlingMiddleware();

// Swagger UI (si lo usás)
app.UseSwaggerWithUi(app.Environment);

// HTTPS redirection (si usás HTTPS)
app.UseHttpsRedirection();

// 1. Routing — debe ir antes de CORS + auth
app.UseRouting();

// 2. CORS — **antes** de autenticación/autorización
app.UseCors("AllowAll");

// 3. Autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// 4. Mapear controladores / endpoints
app.MapControllers();

// 5. Ejecutar la app
app.Run();

