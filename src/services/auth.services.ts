import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import { ILoginFormData, ISignUpFormData } from '@/interfaces/auth.interfaces';

export const logInApi = async (params: ILoginFormData) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/auth/login', params);
  return response.data;
};

export const signUpApi = async (params: ISignUpFormData) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/auth/register', params);
  return response.data;
};
