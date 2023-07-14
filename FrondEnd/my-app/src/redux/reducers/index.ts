import { combineReducers } from 'redux';
import productReducer from './productReducer';
import { RootState } from '../types';

const rootReducer = combineReducers<RootState>({
  products: productReducer,
});

export default rootReducer;
