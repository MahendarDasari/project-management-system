import axios from 'axios';
import { Product, NewProduct } from '../redux/types';

class ProductService {
 
  private apiEndpoint = 'http://localhost:5159/api/products';

  fetchProducts(): Promise<Product[]> {
    return axios.get('http://localhost:5159/api/products').then((response) => { return response.data;});
  }

  addProduct(newProduct: NewProduct): Promise<Product> {
    return axios.post('http://localhost:5159/api/products', newProduct).then((response) => { return response.data;});;
  }

  updateProduct(updatedProduct: Product): Promise<void> {
    const { id, ...productData } = updatedProduct;
    return axios.put(`http://localhost:5159/api/products/${id}`, updatedProduct);
  }

  deleteProduct(productId: number): Promise<void> {
    return axios.delete(`'http://localhost:5159/api/products'/${productId}`);
  }
}

export default ProductService;
