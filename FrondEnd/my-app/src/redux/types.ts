export interface Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: number;
    subcategoryId: number;
  }
  
  export interface NewProduct {
    name: string;
    quantity: number;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: number;
    subcategoryId: number;
  }


  export interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
  }
  
  export interface Subcategory {
    id: number;
    name: string;
    category_id: number;
  }

  export interface RootState {
    products: Product[];
    categories: Category[];
  }  