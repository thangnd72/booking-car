import { TCommonGetListParams, TCommonGetListResponse } from '@/interfaces/common.interface';
import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import { IClient } from '@/interfaces/auth.interfaces';

export const getListUserApi = async (params: TCommonGetListParams) => {
  const response: AxiosResponse<TCommonGetListResponse<IClient[]>> = await ApiClient.get(
    '/api/v1/user/paging',
    {
      params,
    },
  );
  return response.data;
};

export const upgradeUserToWholeSaleApi = async (userId: string) => {
  const response: AxiosResponse<TCommonGetListResponse<IClient[]>> = await ApiClient.put(
    `/api/v1/user/upgrade-to-whole-sale?id=${userId}`,
  );
  return response.data;
};

export const downgradeUserToCustomerApi = async (userId: string) => {
  const response: AxiosResponse<TCommonGetListResponse<IClient[]>> = await ApiClient.put(
    `/api/v1/user/downgrade-to-customer?id=${userId}`,
  );
  return response.data;
};
