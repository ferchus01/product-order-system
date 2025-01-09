using Microsoft.EntityFrameworkCore;
using Project.BusinessLogic.Interfaces;
using Project.BusinessLogic.User;
using Project.DataAccess.DataContext;
using Project.DataAccess.Interfaces;
using Project.DataAccess.Repositories;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 1. Agregar servicio de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularLocalhost",
        policyBuilder =>
        {
            policyBuilder
                .WithOrigins("http://localhost:4200")  // tu app de Angular
                .AllowAnyHeader()
                .AllowAnyMethod();
            // .AllowCredentials(); // Si necesitas cookies o credenciales
        });
});

// --- Repositorios
builder.Services.AddScoped<IUserRepository, UserRepository>();

// --- Servicios de negocio
builder.Services.AddScoped<IUserService, User>();

builder.Services.AddDbContext<ProductOrderSystemContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 2. Usar la política de CORS
app.UseCors("AllowAngularLocalhost");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
