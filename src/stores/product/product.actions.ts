import ResponseError from '@/interfaces/error.interface';
import { getListProductCategoryApi } from '@/services/category.services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EProductActions } from './product.constants';
import { TGetListProductAction, TGetListProductCategoryAction } from './product.types';
import { getListProductApi } from '@/services/product.services';

export const getListProductAction = createAsyncThunk(
  EProductActions.GET_LIST_PRODUCT,
  async (payload: TGetListProductAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await getListProductApi(bodyRequest);
      onSuccess?.(response);
      return {
        ...response,
        page: bodyRequest.page || 0,
        totalPages: Math.ceil(response.total / (bodyRequest.size || 10)),
      };
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);

export const getProductCategoryAction = createAsyncThunk(
  EProductActions.GET_PRODUCT_CATEGORY,
  async (payload: TGetListProductCategoryAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await getListProductCategoryApi(bodyRequest);
      onSuccess?.(response);
      return response;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);
