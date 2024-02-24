import { combineReducers } from 'redux';

//reducer
import { loadingReducer } from './loading';
import { clientReducer } from './client';
import { productReducer } from './product';
import { cartReducer } from './cart';

const allReducer = combineReducers({
  loading: loadingReducer,
  client: clientReducer,
  product: productReducer,
  cart: cartReducer,
});

export default allReducer;
