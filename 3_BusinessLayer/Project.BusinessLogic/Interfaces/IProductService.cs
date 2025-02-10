using ProductEntity = Project.Entities.Product;
using Project.MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Entities;

namespace Project.BusinessLogic.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductEntity>> GetAllProductsAsync();
        Task<ProductEntity> GetProductByIdAsync(int productId);
        Task<ProductEntity> CreateProductAsync(CreateProductIn productDto);
        Task<ProductEntity> UpdateProductAsync(UpdateProductIn productDto);
        Task<bool> DeleteProductAsync(int productId);
        Task<IEnumerable<Category>> GetCategoriesAsync();
    }
}
