import ResponseError from '@/interfaces/error.interface';
import { getListUserApi, upgradeUserToWholeSaleApi } from '@/services/client.services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EClientActions } from './client.constants';
import { TDowngradeUserAction, TGetListUserAction, TUpgradeUserAction } from './client.types';

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

export const upgradeUserToWholeSaleAction = createAsyncThunk(
  EClientActions.UPGRADE_USER_TO_WHOLE_SALE,
  async (payload: TUpgradeUserAction, { rejectWithValue }) => {
    const { onSuccess, onError, userId } = payload;
    try {
      const response = await upgradeUserToWholeSaleApi(userId);
      onSuccess?.(response);
      return response;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);

export const downgradeUserToCustomerAction = createAsyncThunk(
  EClientActions.DOWNGRADE_USER_TO_CUSTOMER,
  async (payload: TDowngradeUserAction, { rejectWithValue }) => {
    const { onSuccess, onError, userId } = payload;
    try {
      const response = await upgradeUserToWholeSaleApi(userId);
      onSuccess?.(response);
      return response;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);
