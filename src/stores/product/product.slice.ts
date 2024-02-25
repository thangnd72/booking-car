import { DEFAULT_GET_LIST_RESPONSE } from '@/common/constants/common';
import { TCommonGetListResponse } from '@/interfaces/common.interface';
import { IProduct, IProductCategory } from '@/interfaces/product.interface';
import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './product.actions';

type TProductState = {
  productCategories: TCommonGetListResponse<IProductCategory[]>;
  productList: TCommonGetListResponse<IProduct[]>;
  productDetail?: IProduct;
  productByCategory: TCommonGetListResponse<IProduct[]>;
  productTomorrow: TCommonGetListResponse<IProduct[]>;
  planProduct: TCommonGetListResponse<IProduct[]>;
};

const initialState: TProductState = {
  productCategories: DEFAULT_GET_LIST_RESPONSE,
  productList: DEFAULT_GET_LIST_RESPONSE,
  productByCategory: DEFAULT_GET_LIST_RESPONSE,
  productTomorrow: DEFAULT_GET_LIST_RESPONSE,
  planProduct: DEFAULT_GET_LIST_RESPONSE,
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

    builder.addCase(asyncActions.getListProductByCategoryAction.fulfilled, (state, { payload }) => {
      if (payload.page > 0) {
        state.productByCategory = {
          ...state.productByCategory,
          totalPages: payload.totalPages,
          page: payload.page,
          total: payload.total,
          data: [...state.productByCategory.data, ...payload.data],
        };
      } else {
        state.productByCategory = payload;
      }
    });

    builder.addCase(asyncActions.getListProductTomorrowAction.fulfilled, (state, { payload }) => {
      if (payload.page > 0) {
        state.productTomorrow = {
          ...state.productTomorrow,
          totalPages: payload.totalPages,
          page: payload.page,
          total: payload.total,
          data: [...state.productTomorrow.data, ...payload.data],
        };
      } else {
        state.productTomorrow = payload;
      }
    });

    builder.addCase(asyncActions.getListPlanProductAction.fulfilled, (state, { payload }) => {
      if (payload.page > 0) {
        state.planProduct = {
          ...state.planProduct,
          totalPages: payload.totalPages,
          page: payload.page,
          total: payload.total,
          data: [...state.planProduct.data, ...payload.data],
        };
      } else {
        state.planProduct = payload;
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
