import ResponseError from '@/interfaces/error.interface';
import { getListProductCategoryApi } from '@/services/category.services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EProductActions } from './product.constants';
import {
  TGetListProductAction,
  TGetListProductCategoryAction,
  TGetListProductDetailAction,
} from './product.types';
import { getListProductApi, getListProductDetailApi } from '@/services/product.services';

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

export const getListProductByCategoryAction = createAsyncThunk(
  EProductActions.GET_LIST_PRODUCT_BY_CATEGORY,
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

export const getListProductTomorrowAction = createAsyncThunk(
  EProductActions.GET_LIST_PRODUCT_TOMORROW,
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

export const getProductDetailAction = createAsyncThunk(
  EProductActions.GET_PRODUCT_DETAIL,
  async (payload: TGetListProductDetailAction, { rejectWithValue }) => {
    const { onSuccess, onError, id } = payload;
    try {
      const response = await getListProductDetailApi(id);
      onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);
