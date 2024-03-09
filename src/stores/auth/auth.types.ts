import {
  IChangePasswordParams,
  ILoginFormData,
  ISignUpFormData,
} from '@/interfaces/auth.interfaces';
import ResponseError from '@/interfaces/error.interface';

export type TLoginAction = ILoginFormData & {
  onSuccess?: (response: any) => void;
  onError?: (error: ResponseError) => void;
};

export type TSignUpAction = ISignUpFormData & {
  onSuccess?: (response: boolean) => void;
  onError?: (error: ResponseError) => void;
};

export type TChangePasswordAction = IChangePasswordParams & {
  onSuccess?: (response: any) => void;
  onError?: (error: ResponseError) => void;
};
