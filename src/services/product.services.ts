import { TCommonGetDataResponse, TCommonGetListResponse } from '@/interfaces/common.interface';
import { IProduct, TGetListProductParams, TUpdatePlanParams } from '@/interfaces/product.interface';
import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';

export const getListProductApi = async (params: TGetListProductParams) => {
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

export const updatePlanProductApi = async (params: TUpdatePlanParams) => {
  const response: AxiosResponse<TCommonGetDataResponse<any>> = await ApiClient.put(
    `/api/v1/product/update-plan`,
    params,
  );
  return response.data;
};
