import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';

export const syncCustomerApi = async () => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/kiotviet/sync-customers');
  return response.data;
};

export const syncCategoriesApi = async () => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/kiotviet/sync-categories');
  return response.data;
};

export const syncProductApi = async () => {
  const response: AxiosResponse<any> = await ApiClient.post('/api/v1/kiotviet/sync-products');
  return response.data;
};
