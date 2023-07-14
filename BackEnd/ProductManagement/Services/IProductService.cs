using ProductManagement.Models;

namespace ProductManagement.Services
{
    public interface IProductService
    {
        Task<Product> CreateProduct(Product product);
        Task<bool> DeleteProduct(string id);
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product> GetProductById(string id);
        Task<bool> UpdateProduct(Product product);
        Task<List<Categories>> GetCategoriesAsync();
    }
}