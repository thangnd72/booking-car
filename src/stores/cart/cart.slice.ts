import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './cart.actions';

type TCartState = {
  shoppingCart: any;
};

const initialState: TCartState = {
  shoppingCart: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(asyncActions.addProductToCartAction.fulfilled, (state, action) => {
      state.shoppingCart = action.payload;
    });
  },
});

export default cartSlice;
