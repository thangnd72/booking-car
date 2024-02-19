import { IUser, IUserRole } from '@/interfaces/auth.interfaces';
import {
  TCommonGetDataResponse,
  TCommonGetListParams,
  TCommonGetListResponse,
} from '@/interfaces/common.interface';
import ResponseError from '@/interfaces/error.interface';

export type TGetListUserAction = TCommonGetListParams & {
  onSuccess?: (response: TCommonGetListResponse<IUser[]>) => void;
  onError?: (error: ResponseError) => void;
};

export type TUpdateProfileUserAction = IUser & {
  onSuccess?: (response: TCommonGetDataResponse<IUser>) => void;
  onError?: (error: ResponseError) => void;
};

export type TGetListRoleAction = {
  onSuccess?: (response: TCommonGetListResponse<IUserRole[]>) => void;
  onError?: (error: ResponseError) => void;
};
