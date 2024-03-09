import { EUserRole } from '@/common';

export interface ILoginFormData {
  email: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  refreshToken: string;
}
export interface ISignUpFormData {
  email: string;
  userName: string;
  password: string;
  enterThePassword: string;
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
export interface IChangePasswordParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IChangeUserParams {
  phoneNumber: string;
  fullName: string;
}

export interface IForgotPwParams {
  email: string;
}

export interface IVerifyOTPParams {
  email: string;
  code: string;
}
