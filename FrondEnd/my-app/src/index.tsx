import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import rootReducer from './redux/reducers';
import productSaga from './redux/sagas/productSaga';

// Create an instance of the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with the root reducer and apply the middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the product saga
sagaMiddleware.run(productSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
