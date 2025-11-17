using Testify.Api.Extensions.Authentication;
using Testify.Api.Extensions.Middleware;
using Testify.Api.Extensions.Swagger;
using Testify.Application.UseCase.Extensions;
using Testify.Persistence.Extensions;


var builder = WebApplication.CreateBuilder(args);

var Configuracion = builder.Configuration;

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();



builder.Services.AddInjectionPersistence();
builder.Services.AddInjectionApplication();
builder.Services.AddAuthenticationNew(Configuracion);
// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Configure the HTTP request pipeline.
app.UseCors("AllowAll"); // Apply the CORS policy

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.AddMiddleware();

app.MapControllers();

app.Run();