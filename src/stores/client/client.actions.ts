import ResponseError from '@/interfaces/error.interface';
import { getListRoleApi } from '@/services/common.services';
import { getListUserApi, updateUserProfileApi } from '@/services/user.services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EClientActions } from './client.constants';
import { TGetListRoleAction, TGetListUserAction, TUpdateProfileUserAction } from './client.types';

export const getListUserAction = createAsyncThunk(
  EClientActions.GET_LIST_USER,
  async (payload: TGetListUserAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await getListUserApi(bodyRequest);
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

export const updateProfileUserAction = createAsyncThunk(
  EClientActions.UPDATE_PROFILE,
  async (payload: TUpdateProfileUserAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await updateUserProfileApi(bodyRequest);
      onSuccess?.(response);
      return response.data;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);

export const getListRoleAction = createAsyncThunk(
  EClientActions.GET_LIST_ROLE,
  async (payload: TGetListRoleAction, { rejectWithValue }) => {
    const { onSuccess, onError } = payload;
    try {
      const response = await getListRoleApi();
      onSuccess?.(response);
      return response.data;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);
