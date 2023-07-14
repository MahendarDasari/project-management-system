import { all } from 'redux-saga/effects';
import productSaga from './productSaga';
// Import other sagas if you have them

function* rootSaga() {
  yield all([
    productSaga(),
    // Add other sagas here
  ]);
}

export default rootSaga;
