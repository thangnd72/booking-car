import { ESortType } from '@/common';

export type TCommonGetListParams = {
  page?: number;
  size?: number;
  query?: string;
  orderBy?: ESortType;
  orderByDescending?: boolean;
};

export type TPagination = {
  page: number;
  totalPages: number;
  total: number;
};

export type TCommonGetListResponse<T = any> = TPagination & {
  data: T;
};
