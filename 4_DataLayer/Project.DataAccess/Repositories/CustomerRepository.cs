using Microsoft.EntityFrameworkCore;
using Project.DataAccess.DataContext;
using Project.DataAccess.Interfaces;
using Project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DataAccess.Repositories
{
    public class CustomerRepository: ICustomerRepository
    {
        private readonly ProductOrderSystemContext _context;

        public CustomerRepository(ProductOrderSystemContext context)
        {
            _context = context;
        }

        public async Task AddCustomerAsync(Customer user)
        {
            await _context.Customers.AddAsync(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                var innerMessage = ex.InnerException?.Message;

                // Loguear y/o retornar el mensaje completo (solo en modo DEBUG, 
                // en producción normalmente no expones detalles del servidor).
                throw new Exception($"Error al guardar en la BD: {innerMessage}", ex);
            }
        }
    }
}
