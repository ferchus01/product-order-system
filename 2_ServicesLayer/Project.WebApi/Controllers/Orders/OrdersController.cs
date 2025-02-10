using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Entities;
using Project.MethodParameters;
using System;

namespace Project.WebApi.Controllers.Orders
{
    //[ApiController]
    //[Route("api/[controller]")]
    //public class OrdersController : ControllerBase
    //{
    //    private readonly AppDbContext _context;

    //    public OrdersController(AppDbContext context)
    //    {
    //        _context = context;
    //    }

    //    [HttpPost]
    //    [Authorize]
    //    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderIn dto)
    //    {
    //        try
    //        {
    //            // Obtengo el UserId desde el token JWT
    //            var userIdClaim = User.FindFirst("UserId")?.Value;
    //            if (string.IsNullOrEmpty(userIdClaim))
    //                return Unauthorized(new { message = "No se encontró el UserId en el token." });

    //            int customerId = int.Parse(userIdClaim);

    //            // Calculo total
    //            decimal totalAmount = 0;
    //            foreach (var detail in dto.OrderDetails)
    //            {
    //                decimal subtotal = detail.Quantity * detail.UnitPrice;
    //                totalAmount += subtotal;
    //            }

    //            // 3. Crear la entidad Order (con Status inicial)
    //            // Suponiendo que OrderStatusId = 1 => "Pendiente"
    //            var newOrder = new Order
    //            {
    //                CustomerId = customerId,
    //                OrderDate = DateTime.Now,
    //                TotalAmount = totalAmount,
    //                OrderStatusId = 1 // "Pendiente" o tu status por defecto
    //            };

    //            // 4. Agregar la Order a EF
    //            _context.Orders.Add(newOrder);
    //            await _context.SaveChangesAsync();

    //            // 5. Crear los OrderDetails
    //            var orderDetailsEntities = new List<OrderDetail>();
    //            foreach (var detail in dto.OrderDetails)
    //            {
    //                var orderDetail = new OrderDetail
    //                {
    //                    OrderId = newOrder.OrderId,
    //                    ProductId = detail.ProductId,
    //                    Quantity = detail.Quantity,
    //                    UnitPrice = detail.UnitPrice,
    //                    Subtotal = detail.Quantity * detail.UnitPrice
    //                };
    //                orderDetailsEntities.Add(orderDetail);
    //            }

    //            _context.OrderDetails.AddRange(orderDetailsEntities);
    //            await _context.SaveChangesAsync();

    //            // (El Trigger en la DB registrará en OrderEvents el status inicial, si está configurado para INSERT)

    //            // Se puede mapear a un DTO para no exponer entidades internas
    //            return Ok(new
    //            {
    //                orderId = newOrder.OrderId,
    //                orderDate = newOrder.OrderDate,
    //                totalAmount = newOrder.TotalAmount,
    //                orderStatusId = newOrder.OrderStatusId,
    //                orderDetails = orderDetailsEntities.Select(od => new {
    //                    od.OrderDetailId,
    //                    od.ProductId,
    //                    od.Quantity,
    //                    od.UnitPrice,
    //                    od.Subtotal
    //                })
    //            });
    //        }
    //        catch (Exception ex)
    //        {
    //            // Manejo de errores
    //            return StatusCode(StatusCodes.Status500InternalServerError,
    //                new { message = "Error al crear la orden.", detail = ex.Message });
    //        }
    //    }


    //    [HttpGet("all")]
    //    [Authorize()]
    //    public async Task<IActionResult> GetAllOrders()
    //    {
    //        // Asumiendo que tienes un método en tu servicio / repositorio
    //        var orders = await _orderService.GetAllOrdersWithDetailsAsync();
    //        return Ok(orders);
    //    }
    //}

}
