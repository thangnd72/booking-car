import { ILocation, ILocationParams } from '@/interfaces/location.interface';
import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import { TCommonGetDataResponse } from '@/interfaces/common.interface';

export const getProvincesApi = async (params: ILocationParams) => {
  const response: AxiosResponse<TCommonGetDataResponse<ILocation[]>> = await ApiClient.post(
    '/api/v1/location/provinces',
    params,
  );
  return response.data;
};

export const getDistrictsApi = async (params: ILocationParams) => {
  const response: AxiosResponse<TCommonGetDataResponse<ILocation[]>> = await ApiClient.post(
    '/api/v1/location/districts',
    params,
  );
  return response.data;
};

export const getWardsApi = async (params: ILocationParams) => {
  const response: AxiosResponse<TCommonGetDataResponse<ILocation[]>> = await ApiClient.post(
    '/api/v1/location/wards',
    params,
  );
  return response.data;
};
