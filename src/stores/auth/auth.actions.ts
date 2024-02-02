import { createAsyncThunk } from '@reduxjs/toolkit';
import { EAuthActions } from './auth.constants';
import { logInApi, signUpApi } from '@/services/auth.services';
import ResponseError from '@/interfaces/error.interface';
import { TLoginAction, TSignUpAction } from './auth.types';

export const logInAction = createAsyncThunk(
  EAuthActions.LOGIN,
  async (payload: TLoginAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await logInApi(bodyRequest);
      console.log('response', response);
      onSuccess?.(response.data);
      return response;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);

export const signUpAction = createAsyncThunk(
  EAuthActions.LOGIN,
  async (payload: TSignUpAction, { rejectWithValue }) => {
    const { onSuccess, onError, ...bodyRequest } = payload;
    try {
      const response = await signUpApi(bodyRequest);
      onSuccess?.(response.data);
      return response;
    } catch (error) {
      onError?.(error as ResponseError);
      return rejectWithValue(error);
    }
  },
);
