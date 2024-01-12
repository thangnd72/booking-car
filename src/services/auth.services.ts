import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';

export const logInApi = async (bodyRequest: any) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/auth/login', bodyRequest);
  return response.data;
};
