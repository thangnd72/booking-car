import { EUserRole } from '@/common';

export interface ILoginFormData {
  username: string;
  password: string;
}
export interface ISignUpFormData {
  phoneNumber: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}
export interface ISignUpResponse {
  accessToken: string;
  profile: IUser;
  refreshToken: string;
}

export interface IUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  roles: IUserRole[];
  created: string;
  modified: string;
  avatarUrl: string;
  avatar: string;
}

export interface IUserRole {
  id: string;
  name: string;
  roleId: string;
  code: EUserRole;
  modified?: string;
}
