import {
  TCommonGetDataResponse,
  TCommonGetListParams,
  TCommonGetListResponse,
} from '@/interfaces/common.interface';
import ResponseError from '@/interfaces/error.interface';
import {
  IProduct,
  IProductCategory,
  TGetListProductParams,
  TUpdatePlanParams,
} from '@/interfaces/product.interface';

export type TGetListProductAction = TGetListProductParams & {
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

export type TUpdatePlanProductAction = TUpdatePlanParams & {
  onSuccess?: (response: IProduct) => void;
  onError?: (error: ResponseError) => void;
};
