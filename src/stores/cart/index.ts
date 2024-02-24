import * as cartActions from './cart.actions';
import { ECartActions } from './cart.constants';
import cartSlice from './cart.slice';

export { ECartActions };
export const {
  actions: {},
} = cartSlice;

export const { reducer: cartReducer } = cartSlice;

export const { getListCartAction, updateCartAction } = cartActions;
