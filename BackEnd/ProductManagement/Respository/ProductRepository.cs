using Dapper;
using Npgsql;
using ProductManagement.Models;
using System.Data;

public class ProductRepository : IProductRepository
{
    private readonly IConfiguration _configuration;
    private string ConnectionString => _configuration.GetConnectionString("DefaultConnection");
    private readonly string GetAllProductsQuery = @"SELECT code as Id,
	                                                                name,
	                                                                price,
	                                                                description,
	                                                                image_url AS ImageUrl,
	                                                                quantity,
	                                                                category_id as CategoryId,
	                                                                subcategory_id as SubcategoryId,
	                                                                active,
	                                                                created_at,
	                                                                updated_at
                                                                FROM PUBLIC.products;";
    private readonly string GetProductByIDQuery = @"SELECT code as Id,
	                                                                name,
	                                                                price,
	                                                                description,
	                                                                image_url AS ImageUrl,
	                                                                quantity,
	                                                                category_id as CategoryId,
	                                                                subcategory_id as SubcategoryId,
	                                                                active,
	                                                                created_at,
	                                                                updated_at
                                                                FROM PUBLIC.products WHERE code = @Id;";

    public ProductRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IDbConnection CreateConnection()
    {
        return new NpgsqlConnection(ConnectionString);
    }

    public async Task<IEnumerable<Product>> GetAllProducts()
    {
        using (var connection = CreateConnection())
        {
            connection.Open();
            var products = await connection.QueryAsync<Product>(GetAllProductsQuery);
            return products;
        }
    }

    public async Task<Product> GetProductById(string id)
    {
        using (var connection = CreateConnection())
        {
            connection.Open();

            var product = await connection.QueryFirstOrDefaultAsync<Product>(GetProductByIDQuery, new { Id = id });
            return product;
        }
    }

    public async Task<Product> CreateProduct(Product product)
    {
        using (var connection = CreateConnection())
        {
            connection.Open();
            var query = @"INSERT into products (name, price, description, image_url, category_id, subcategory_id,quantity) 
                                VALUES (@Name, @Price, @Description,@ImageUrl,@CategoryId,@SubcategoryId,@Quantity) RETURNING code";
            var code = await connection.ExecuteScalarAsync<string>(query, product);
            product.Id = code;
            return product;
        }
    }

    public async Task<bool> UpdateProduct(Product product)
    {
        using (var connection = CreateConnection())
        {
            connection.Open();
            var query = @"UPDATE products SET name = @Name,
                                                     price = @Price,
                                                     description = @Description ,
                                                     image_url = @ImageUrl ,
                                                     category_id = @CategoryId,
                                                     subcategory_id = @SubcategoryId,
                                                     quantity = @Quantity
                                                    WHERE code = @Id";
            var affectedRows = await connection.ExecuteAsync(query, product);
            return affectedRows > 0;
        }
    }

    public async Task<bool> DeleteProduct(string id)
    {
        using (var connection = CreateConnection())
        {
            connection.Open();
            var query = "DELETE FROM products WHERE code = @Id";
            var affectedRows = await connection.ExecuteAsync(query, new { Id = id });
            return affectedRows > 0;
        }
    }


    public async Task<List<Categories>> GetCategoriesAsync()
    {
        using (var connection = CreateConnection())
        {
            connection.Open();
            var query = "Select id,name from categories;";
            var subQuery = "Select id,name,category_id from subcategories;";
            var categoriesList = await connection.QueryAsync<Categories>(query);
            var subCategoriesList = await connection.QueryAsync<Subcategory>(subQuery);
            // Create a dictionary to store subcategories by category ID
            var subcategoriesByCategory = subCategoriesList.GroupBy(s => s.category_id)
                                                      .ToDictionary(g => g.Key, g => g.ToList());

            // Assign the list of subcategories to each category
            foreach (var category in categoriesList)
            {
                if (subcategoriesByCategory.TryGetValue(category.id, out var subcategoriesList))
                {
                    category.subcategories = subcategoriesList;
                }
            }

            return categoriesList.ToList();
        }
    }
}
