﻿namespace ProductManagement.Models
{
    public class Product
    {
        public string? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public int Quantity { get; set; }
    }

}
