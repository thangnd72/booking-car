import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';

export const checkoutOrderApi = async (payload: any) => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/order/checkout', payload);
  return response.data;
};
