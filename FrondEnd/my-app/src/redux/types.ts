export interface Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    imageUrl: string;
  }
  
  export interface NewProduct {
    name: string;
    quantity: number;
    price: number;
    description: string;
    imageUrl: string;
  }
  
  export interface RootState {
    products: Product[];
  }
  