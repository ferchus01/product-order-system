using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.BusinessLogic.Interfaces;
using Project.MethodParameters;

namespace Project.WebApi.Controllers.NewFolder
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var productDto = await _productService.GetProductByIdAsync(id);
            if (productDto == null)
                return NotFound(new { message = "Producto no encontrado." });

            return Ok(productDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateProductIn productDto)
        {
            try
            {
                var newProduct = await _productService.CreateProductAsync(productDto);
                return CreatedAtAction(nameof(GetById),
                    new { id = newProduct.ProductId },
                    newProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProductIn productDto)
        {
            var updated = await _productService.UpdateProductAsync(productDto);
            if (updated == null)
                return NotFound(new { message = "Producto no encontrado." });

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _productService.DeleteProductAsync(id);
            if (!result)
                return NotFound(new { message = "Producto no encontrado." });

            // NoContent → 204
            return NoContent();
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _productService.GetCategoriesAsync();
            return Ok(categories);
        }
    }
}
