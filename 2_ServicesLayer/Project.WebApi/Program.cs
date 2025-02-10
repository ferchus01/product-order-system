using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project.BusinessLogic.Interfaces;
using Project.BusinessLogic.Product;
using Project.BusinessLogic.User;
using Project.DataAccess.DataContext;
using Project.DataAccess.Interfaces;
using Project.DataAccess.Repositories;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,   // Ajusta según necesidad
            ValidateAudience = false, // Ajusta según necesidad
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])
            )
        };
    });
    
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
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// --- Servicios de negocio
builder.Services.AddScoped<IUserService, User>();
builder.Services.AddScoped<IProductService, ProductService>();

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
