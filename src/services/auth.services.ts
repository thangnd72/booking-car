import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import {
  IChangePasswordParams,
  ILoginFormData,
  ISignUpFormData,
} from '@/interfaces/auth.interfaces';

export const logInApi = async (params: ILoginFormData) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/auth/login', params);
  return response.data;
};

export const signUpApi = async (params: ISignUpFormData) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/auth/register', params);
  return response.data;
};

export const changePasswordApi = async (params: IChangePasswordParams) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/auth/change-password', params);
  return response.data;
};
