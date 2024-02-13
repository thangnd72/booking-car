import { TCommonGetListParams, TCommonGetListResponse } from '@/interfaces/common.interface';
import { AxiosResponse } from 'axios';
import { ApiClient } from './api-client';
import { IProductCategory } from '@/interfaces/product.interface';

export const getListProductCategoryApi = async (params: TCommonGetListParams) => {
  const response: AxiosResponse<TCommonGetListResponse<IProductCategory[]>> = await ApiClient.get(
    '/api/v1/productcategory/paging',
    {
      params,
    },
  );
  return response.data;
};
