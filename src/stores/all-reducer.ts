import { combineReducers } from 'redux';

//reducer
import { loadingReducer } from './loading';
import { clientReducer } from './client';

const allReducer = combineReducers({
  loading: loadingReducer,
  client: clientReducer,
});

export default allReducer;
