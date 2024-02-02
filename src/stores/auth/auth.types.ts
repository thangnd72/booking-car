import { ILoginFormData, ISignUpFormData, ISignUpResponse } from '@/interfaces/auth.interfaces';
import ResponseError from '@/interfaces/error.interface';

export type TLoginAction = ILoginFormData & {
  onSuccess?: (response: any) => void;
  onError?: (error: ResponseError) => void;
};

export type TSignUpAction = ISignUpFormData & {
  onSuccess?: (response: ISignUpResponse) => void;
  onError?: (error: ResponseError) => void;
};
