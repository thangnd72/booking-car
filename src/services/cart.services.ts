import { ICartType, IUpdateCartParams, TCartList } from '@/interfaces/cart.interface';
import { TCommonGetDataResponse } from '@/interfaces/common.interface';
import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';

export const getCartTypesApi = async () => {
  const response: AxiosResponse<TCommonGetDataResponse<ICartType[]>> = await ApiClient.get(
    '/api/v1/cart/types',
  );
  return response.data;
};

export const getListCartApi = async () => {
  const response: AxiosResponse<TCommonGetDataResponse<TCartList>> = await ApiClient.get(
    '/api/v1/cart',
  );
  return response.data;
};

export const updateCartApi = async (params: IUpdateCartParams) => {
  const response: AxiosResponse<TCommonGetDataResponse<TCartList>> = await ApiClient.put(
    '/api/v1/cart',
    params,
  );
  return response.data;
};
