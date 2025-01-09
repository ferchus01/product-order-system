using Project.BusinessLogic.Interfaces;
using Entities = Project.Entities;
using Project.MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.DataAccess.Interfaces;

namespace Project.BusinessLogic.User
{
    public class User : IUserService
    {
        private readonly IUserRepository _userRepository;

        public User(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Entities.User> RegisterUserAsync(RegisterUserIn registerDto)
        {
            // 1. Validar si el usuario ya existe
            var existingUser = await _userRepository.GetByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                throw new Exception("El correo ya está en uso.");
            }

            // 2. Hashear la contraseña
            var passwordHash = HashPassword(registerDto.Password);

            // 3. Crear la entidad User
            var newUser = new Entities.User
            {
                Email = registerDto.Email,
                Password = passwordHash,
                CreatedDate = DateTime.UtcNow,
                Username = registerDto.UserName,
                RoleId = 2,
            };

            // 4. Guardar el usuario en la BD
            await _userRepository.AddUserAsync(newUser);

            // 5. Retornar el usuario para que el Controller decida qué hacer
            return newUser;
        }

        private string HashPassword(string password)
        {
            // Método simplificado con SHA256 (no es el ideal para producción).
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(
                    System.Text.Encoding.UTF8.GetBytes(password)
                );
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}
