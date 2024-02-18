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
  profile: IClient;
  refreshToken: string;
}

export interface IClient {
  id: string;
  fullName: string;
  phoneNumber: string;
  roles: IClientRole[];
  created: string;
  avatarUrl: string;
}

export interface IClientRole {
  id: string;
  name: string;
  roleId: string;
}
