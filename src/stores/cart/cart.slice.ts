import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './cart.actions';
import { TCartList } from '@/interfaces/cart.interface';

type TCartState = {
  shoppingCart: TCartList | undefined;
};

const initialState: TCartState = {
  shoppingCart: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(asyncActions.getListCartAction.fulfilled, (state, action) => {
      state.shoppingCart = action.payload;
    });

    builder.addCase(asyncActions.updateCartAction.fulfilled, (state, action) => {
      state.shoppingCart = action.payload;
    });
  },
});

export default cartSlice;
