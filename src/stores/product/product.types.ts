import {
  TCommonGetDataResponse,
  TCommonGetListParams,
  TCommonGetListResponse,
} from '@/interfaces/common.interface';
import ResponseError from '@/interfaces/error.interface';
import { IProduct, IProductCategory } from '@/interfaces/product.interface';

export type TGetListProductAction = TCommonGetListParams & {
  onSuccess?: (response: TCommonGetListResponse<IProduct[]>) => void;
  onError?: (error: ResponseError) => void;
};

export type TGetListProductCategoryAction = TCommonGetListParams & {
  onSuccess?: (response: TCommonGetListResponse<IProductCategory[]>) => void;
  onError?: (error: ResponseError) => void;
};

export type TGetListProductDetailAction = { id: string } & {
  onSuccess?: (response: IProduct) => void;
  onError?: (error: ResponseError) => void;
};
