import { combineReducers } from 'redux';

//reducer
import { loadingReducer } from './loading';
import { clientReducer } from './client';
import { productReducer } from './product';

const allReducer = combineReducers({
  loading: loadingReducer,
  client: clientReducer,
  product: productReducer,
});

export default allReducer;
