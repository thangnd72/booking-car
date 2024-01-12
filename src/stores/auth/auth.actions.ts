import { createAsyncThunk } from '@reduxjs/toolkit';
import { EAuthActions } from './auth.constants';
import { logInApi } from '@/services/auth.services';
import ResponseError from '@/interfaces/error.interface';
import { TLoginAction } from './auth.types';

export const logInAction = createAsyncThunk(
  EAuthActions.LOGIN,
  async (payload: TLoginAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await logInApi(bodyRequest);
      onSuccess?.(response);
      return { response, page: bodyRequest.page };
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);
