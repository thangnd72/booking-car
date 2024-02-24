import { IProductItem, IUpdateCartParams, TCartList } from '@/interfaces/cart.interface';
import { TCommonGetDataResponse } from '@/interfaces/common.interface';
import ResponseError from '@/interfaces/error.interface';

export type TUpdateCartAction = IUpdateCartParams & {
  onSuccess?: (response: TCommonGetDataResponse<TCartList>) => void;
  onError?: (error: ResponseError) => void;
};

export type TGetListCartAction = {
  onSuccess?: (response: TCommonGetDataResponse<TCartList>) => void;
  onError?: (error: ResponseError) => void;
};
