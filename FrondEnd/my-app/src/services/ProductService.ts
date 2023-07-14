import axios from 'axios';
import { Product, NewProduct } from '../redux/types';

class ProductService {
 
  private apiEndpoint = 'http://localhost:5159/api/products';

  fetchProducts(): Promise<Product[]> {
    return axios.get('http://localhost:5159/api/products').then((response) => {console.log(response); return response.data;});
  }

  addProduct(newProduct: NewProduct): Promise<void> {
    return axios.post(this.apiEndpoint, newProduct);
  }

  updateProduct(updatedProduct: Product): Promise<void> {
    const { id, ...productData } = updatedProduct;
    return axios.put(`${this.apiEndpoint}/${id}`, productData);
  }

  deleteProduct(productId: number): Promise<void> {
    return axios.delete(`${this.apiEndpoint}/${productId}`);
  }
}

export default ProductService;
