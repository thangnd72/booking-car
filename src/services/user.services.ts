import {
  TCommonGetDataResponse,
  TCommonGetListParams,
  TCommonGetListResponse,
} from '@/interfaces/common.interface';
import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import { IUser } from '@/interfaces/auth.interfaces';

export const getListUserApi = async (params: TCommonGetListParams) => {
  const response: AxiosResponse<TCommonGetListResponse<IUser[]>> = await ApiClient.get(
    '/api/v1/user/paging',
    {
      params,
    },
  );
  return response.data;
};

export const updateUserProfileApi = async (payload: IUser) => {
  console.log('payload', payload);
  const response: AxiosResponse<TCommonGetDataResponse<IUser>> = await ApiClient.put(
    `/api/v1/user/update-profile`,
    payload,
  );
  return response.data;
};
