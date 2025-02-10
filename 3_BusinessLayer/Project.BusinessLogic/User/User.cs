using Project.BusinessLogic.Interfaces;
using Entities = Project.Entities;
using Project.MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.DataAccess.Interfaces;
using Project.Entities;

namespace Project.BusinessLogic.User
{
    public class User : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICustomerRepository _customerRepository;

        public User(IUserRepository userRepository, ICustomerRepository customerRepository)
        {
            _userRepository = userRepository;
            _customerRepository = customerRepository;
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

            var newCustomer = new Customer
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                RegistrationDate = DateTime.UtcNow,
                UserId = newUser.UserId  // Enlazamos con el user creado
            };

            // 6. Guardamos el Customer
            await _customerRepository.AddCustomerAsync(newCustomer);

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


        public async Task<Entities.User> ValidateUserCredentialsAsync(LoginIn loginDto)
        {
            // 1. Buscar el usuario por email
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);
            if (user == null)
                return null; // No existe el email

            // 2. Verificar la contraseña hasheada
            bool isValidPassword = VerifyPassword(user.Password, loginDto.Password);
            if (!isValidPassword)
                return null; // Contraseña incorrecta

            return user; // Ok, credenciales válidas
        }

        private bool VerifyPassword(string storedHash, string providedPassword)
        {
            // Ejemplo simple con SHA256 
            // (Recuerda usar BCrypt / Argon2 / PBKDF2 en escenarios productivos)
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var providedHashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(providedPassword));
                var providedHash = Convert.ToBase64String(providedHashBytes);
                return (providedHash == storedHash);
            }
        }
    }
}
