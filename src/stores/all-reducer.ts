import { combineReducers } from 'redux';

//reducer
import { loadingReducer } from './loading';

const allReducer = combineReducers({
  loading: loadingReducer,
});

export default allReducer;
