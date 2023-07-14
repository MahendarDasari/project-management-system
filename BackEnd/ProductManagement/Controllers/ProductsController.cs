using Microsoft.AspNetCore.Mvc;
using ProductManagement.Models;
using ProductManagement.Services;

namespace ProductManagement.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(string id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateProduct(Product product)
        {
            var productId = await _productService.CreateProduct(product);
            return Ok(productId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(string id, Product product)
        {
            if (id != product.Id)
                return BadRequest();

            var success = await _productService.UpdateProduct(product);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(string id)
        {
            var success = await _productService.DeleteProduct(id);
            if (!success)
                return NotFound();

            return NoContent();
        }


        [HttpGet("Categories")]
        public async Task<ActionResult> GetCategories()
        {
            var result = await _productService.GetCategoriesAsync();


            return Ok(result);
        }



    }
}

