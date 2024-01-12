import ResponseError from '@/interfaces/error.interface';

export type TLoginAction = any & {
  onSuccess?: (response: any) => void;
  onError?: (error: ResponseError) => void;
};
