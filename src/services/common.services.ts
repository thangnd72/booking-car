import { IUserRole } from '@/interfaces/auth.interfaces';
import axios, { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import { TCommonGetListResponse } from '@/interfaces/common.interface';

export const uploadPhotoApi = async (file: FormData) => {
  const response: AxiosResponse<any> = await axios
    .create({ baseURL: 'https://content.chaien.vn' })
    .post(`/api/storage/public/write`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        internalkey: 'public',
      },
    });

  return response.data;
};

export const getListRoleApi = async () => {
  const response: AxiosResponse<TCommonGetListResponse<IUserRole[]>> = await ApiClient.get(
    `/api/v1/role`,
  );
  return response.data;
};
