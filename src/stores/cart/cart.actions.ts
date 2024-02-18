import { createAsyncThunk } from '@reduxjs/toolkit';
import { ECartActions } from './cart.constants';
import { getListProductApi } from '@/services/product.services';
import ResponseError from '@/interfaces/error.interface';

export const addProductToCartAction = createAsyncThunk(
  ECartActions.ADD_TO_CART,
  async (payload: any, { rejectWithValue }) => {
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
