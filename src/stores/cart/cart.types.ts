import ResponseError from '@/interfaces/error.interface';

export type TAddProductToCartAction = {
  onSuccess?: (response: any) => void;
  onError?: (error: ResponseError) => void;
};
