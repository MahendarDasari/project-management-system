namespace ProductManagement.Models
{
    public class Categories
    {
        public int id { get; set; }
        public string name { get; set; }
        public List<Subcategory> subcategories { get; set; }
    }

    public class Subcategory
    {
        public int id { get; set; }
        public string name { get; set; }
        public int category_id { get; set; }
    }
}
