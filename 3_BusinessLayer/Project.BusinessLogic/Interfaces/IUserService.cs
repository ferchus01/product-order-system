using Entities = Project.Entities;
using Project.MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task<Entities.User> RegisterUserAsync(RegisterUserIn registerDto);
        Task<Entities.User> ValidateUserCredentialsAsync(LoginIn loginDto);
    }
}
