import { IClient } from '@/interfaces/auth.interfaces';
import { TCommonGetListParams, TCommonGetListResponse } from '@/interfaces/common.interface';
import ResponseError from '@/interfaces/error.interface';

export type TGetListUserAction = TCommonGetListParams & {
  onSuccess?: (response: TCommonGetListResponse<IClient[]>) => void;
  onError?: (error: ResponseError) => void;
};

export type TUpgradeUserAction = { userId: string } & {
  onSuccess?: (response: any) => void;
  onError?: (error: ResponseError) => void;
};

export type TDowngradeUserAction = { userId: string } & {
  onSuccess?: (response: any) => void;
  onError?: (error: ResponseError) => void;
};
