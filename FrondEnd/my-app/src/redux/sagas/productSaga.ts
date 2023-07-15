// Import the necessary dependencies and action types
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  fetchProductsSuccess,
  addProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
} from '../actions/productActions';
import ProductService from '../../services/ProductService';

import { Product, NewProduct } from '../types';

// Create an instance of the ProductService
const productService = new ProductService();

// Define saga worker functions
function* fetchProductsSaga() {
  try {
    // Make the API call to fetch products
    const products: Product[] = yield call(productService.fetchProducts);
    // Dispatch the success action with the retrieved products
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    // Handle any errors
    console.error('Error fetching products:', error);
  }
}

function* addProductSaga(action: any) {
  try {
    // Get the new product data from the action payload
    const newProduct: NewProduct = action.payload;
    // Make the API call to add the product
    const prod: Product = yield call(productService.addProduct, newProduct);
    // Dispatch the success action
    yield put(addProductSuccess(prod));
  } catch (error) {
    // Handle any errors
    console.error('Error adding product:', error);
  }
}

function* updateProductSaga(action: any) {
  try {
    // Get the updated product data from the action payload
    const updatedProduct: Product = action.payload;
    // Make the API call to update the product
    yield call(productService.updateProduct, updatedProduct);
    // Dispatch the success action
    yield put(updateProductSuccess(updatedProduct));
  } catch (error) {
    // Handle any errors
    console.error('Error updating product:', error);
  }
}

function* deleteProductSaga(action: any) {
  try {
    // Get the product ID from the action payload
    const productId: number = action.payload;
    // Make the API call to delete the product
    yield call(productService.deleteProduct, productId);
    // Dispatch the success action
    yield put(deleteProductSuccess(productId));
  } catch (error) {
    // Handle any errors
    console.error('Error deleting product:', error);
  }
}

// Define saga watcher function
function* productSaga() {
  yield takeEvery(FETCH_PRODUCTS, fetchProductsSaga);
  yield takeEvery(ADD_PRODUCT, addProductSaga);
  yield takeEvery(UPDATE_PRODUCT, updateProductSaga);
  yield takeEvery(DELETE_PRODUCT, deleteProductSaga);
}

export default productSaga;
