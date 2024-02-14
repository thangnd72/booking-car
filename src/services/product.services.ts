import {
  TCommonGetDataResponse,
  TCommonGetListParams,
  TCommonGetListResponse,
} from '@/interfaces/common.interface';
import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import { IProduct } from '@/interfaces/product.interface';

export const getListProductApi = async (params: TCommonGetListParams) => {
  const response: AxiosResponse<TCommonGetListResponse<IProduct[]>> = await ApiClient.get(
    '/api/v1/product/paging',
    {
      params,
    },
  );
  return response.data;
};

export const getListProductDetailApi = async (id: string) => {
  const response: AxiosResponse<TCommonGetDataResponse<IProduct>> = await ApiClient.get(
    `/api/v1/product/${id}`,
  );
  return response.data;
};
