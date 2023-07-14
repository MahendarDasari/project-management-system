using ProductManagement.Models;

namespace ProductManagement.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProducts();
            return products;
        }

        public async Task<Product> GetProductById(string id)
        {
            var product = await _productRepository.GetProductById(id);
            return product;
        }

        public async Task<Product> CreateProduct(Product product)
        {
            var productId = await _productRepository.CreateProduct(product);
            return productId;
        }

        public async Task<bool> UpdateProduct(Product product)
        {
            var success = await _productRepository.UpdateProduct(product);
            return success;
        }

        public async Task<bool> DeleteProduct(string id)
        {
            var success = await _productRepository.DeleteProduct(id);
            return success;
        }

        public async Task<List<Categories>> GetCategoriesAsync()
        {
            return await _productRepository.GetCategoriesAsync();
        }
    }

}
