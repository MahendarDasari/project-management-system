
import { Product, NewProduct } from '../types';

// Define action types
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

// Define action creators
export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
});

export const fetchProductsSuccess = (products: Product[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const addProduct = (newProduct: NewProduct) => ({
  type: ADD_PRODUCT,
  payload: newProduct,
});

export const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS,
});

export const updateProduct = (updatedProduct: Product) => ({
  type: UPDATE_PRODUCT,
  payload: updatedProduct,
});

export const updateProductSuccess = () => ({
  type: UPDATE_PRODUCT_SUCCESS,
});

export const deleteProduct = (productId: string) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});
