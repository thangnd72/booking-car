export type TCommonGetListParams = {
  page?: number;
  size?: number;
  query?: string;
  asc?: string;
  desc?: string;
};

export type TPagination = {
  page: number;
  totalPages: number;
  total: number;
};

export type TCommonGetListResponse<T = any> = TPagination & {
  data: T;
};

export type TFormatResponse = {
  code: number;
  success: boolean;
  errorMessage: string;
  validateInfo: any;
  serverTime: string;
};

export type TCommonGetDataResponse<T = any> = TFormatResponse & {
  data: T;
};
