using Project.BusinessLogic.Interfaces;
using Project.DataAccess.Interfaces;
using ProductEntity = Project.Entities.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.MethodParameters;
using Project.Entities;

namespace Project.BusinessLogic.Product
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllAsync();

            // Mapeo de Entity a DTO
            var productDtos = products.Select(p => new ProductEntity
            {
                ProductId = p.ProductId,
                Name = p.Name,
                Price = p.Price,
                Category = p.Category,
                CategoryId = p.CategoryId,
                Image = p.Image,
                Stock = p.Stock,
                Description = p.Description,
            });

            return productDtos;
        }

        public async Task<ProductEntity> GetProductByIdAsync(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null) return null;

            return new ProductEntity
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                Category = product.Category,
                Image = product.Image,
                Stock = product.Stock,
                Description = product.Description
            };
        }

        public async Task<ProductEntity> CreateProductAsync(CreateProductIn productDto)
        {
            // Validaciones de negocio, e.g. Name no vacío, Price > 0, etc.
            if (string.IsNullOrWhiteSpace(productDto.Name))
                throw new Exception("El nombre del producto es obligatorio.");
            if (productDto.Price < 0)
                throw new Exception("El precio no puede ser negativo.");

            var product = new ProductEntity
            {
                Name = productDto.Name,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId,
                Image = productDto.Image,
                Stock = productDto.Stock,
                Description = productDto.Description
            };

            await _productRepository.AddAsync(product);

            // Después de guardar, product.ProductId ya tiene la PK
            //productDto.ProductId = product.ProductId;
            return product; // Retornamos el DTO con el ID asignado.
        }

        public async Task<ProductEntity> UpdateProductAsync(UpdateProductIn productDto)
        {
            var existing = await _productRepository.GetByIdAsync(productDto.ProductId);
            if (existing == null) return null; // o lanzar excepción

            // Actualizar valores
            existing.Name = productDto.Name;
            existing.Price = productDto.Price;
            existing.CategoryId = productDto.CategoryId;
            existing.Image = productDto.Image;
            existing.Stock = productDto.Stock;
            existing.Description = productDto.Description;

            await _productRepository.UpdateAsync(existing);

            // Retornar un DTO con datos actualizados
            return new ProductEntity
            {
                ProductId = existing.ProductId,
                Name = existing.Name,
                Price = existing.Price,
                Category = existing.Category,
                Image = existing.Image,
                Stock = existing.Stock,
                Description= existing.Description
            };
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            var existing = await _productRepository.GetByIdAsync(productId);
            if (existing == null) return false;

            await _productRepository.DeleteAsync(existing);
            return true;
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            var categories = await _productRepository.GetCategoriesAsync();

            // Mapeo de Entity a DTO
            //var categoryDtos = categories.Select(pd => new Category
            //{
            //    CategoryId = p.ProductId,
            //    Description = p.Name,
            //});

            return categories;
        }
    }
}
