import ResponseError from '@/interfaces/error.interface';
import { getListCartApi, updateCartApi } from '@/services/cart.services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ECartActions } from './cart.constants';
import { TGetListCartAction, TUpdateCartAction } from './cart.types';

export const getListCartAction = createAsyncThunk(
  ECartActions.GET_LIST_CART,
  async (payload: TGetListCartAction, { rejectWithValue }) => {
    const { onSuccess, onError } = payload;
    try {
      const response = await getListCartApi();
      onSuccess?.(response);
      return response.data;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);

export const updateCartAction = createAsyncThunk(
  ECartActions.UPDATE_CART,
  async (payload: TUpdateCartAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await updateCartApi(bodyRequest);
      onSuccess?.(response);
      return response.data;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);
