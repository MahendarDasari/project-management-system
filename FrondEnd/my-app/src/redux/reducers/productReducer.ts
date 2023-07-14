// Import the necessary action types
import {
    FETCH_PRODUCTS_SUCCESS,
    ADD_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
  } from '../actions/productActions';
import { Product } from '../types';  

  // Define the initial state
  const initialState: Product[] = [];
  
  // Define the reducer function
  const productReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return action.payload;
      case ADD_PRODUCT_SUCCESS:
        return [...state, action.payload];
      case UPDATE_PRODUCT_SUCCESS:
        return state.map((product: Product) =>
          product.id === action.payload.id ? action.payload : product
        );
      case DELETE_PRODUCT_SUCCESS:
        return state.filter((product: Product) => product.id !== action.payload);
      default:
        return state;
    }
  };
  
  export default productReducer;
  