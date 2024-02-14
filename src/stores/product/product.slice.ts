import { DEFAULT_GET_LIST_RESPONSE } from '@/common/constants/common';
import { TCommonGetListResponse } from '@/interfaces/common.interface';
import { IProduct, IProductCategory } from '@/interfaces/product.interface';
import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './product.actions';

type TProductState = {
  productCategories: TCommonGetListResponse<IProductCategory[]>;
  productList: TCommonGetListResponse<IProduct[]>;
  productDetail?: IProduct;
};

const initialState: TProductState = {
  productCategories: DEFAULT_GET_LIST_RESPONSE,
  productList: DEFAULT_GET_LIST_RESPONSE,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(asyncActions.getListProductAction.fulfilled, (state, { payload }) => {
      if (payload.page > 0) {
        state.productList = {
          ...state.productList,
          totalPages: payload.totalPages,
          page: payload.page,
          total: payload.total,
          data: [...state.productList.data, ...payload.data],
        };
      } else {
        state.productList = payload;
      }
    });

    builder.addCase(asyncActions.getProductCategoryAction.fulfilled, (state, action) => {
      state.productCategories = action.payload;
    });

    builder.addCase(asyncActions.getProductDetailAction.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  },
});

export default productSlice;
