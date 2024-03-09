import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import {
  IChangePasswordParams,
  ILoginFormData,
  ILoginResponse,
  ISignUpFormData,
} from '@/interfaces/auth.interfaces';
import { TCommonGetDataResponse } from '@/interfaces/common.interface';

export const logInApi = async (params: ILoginFormData) => {
  const response: AxiosResponse<ILoginResponse> = await ApiClient.post(
    '/api/v1/Auth/login',
    params,
  );
  return response.data;
};

export const signUpApi = async (params: ISignUpFormData) => {
  const response: AxiosResponse<TCommonGetDataResponse<boolean>> = await ApiClient.post(
    '/api/v1/Auth/register',
    params,
  );
  return response.data;
};

export const changePasswordApi = async (params: IChangePasswordParams) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/auth/change-password', params);
  return response.data;
};
