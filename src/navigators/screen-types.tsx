export enum APP_SCREEN {
  // root stack
  AUTHORIZE = 'AUTHORIZE',
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  /**
   * UN_AUTH
   */
  SPLASH = 'SPLASH',
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CREATE_NEW_PASSWORD = 'CREATE_NEW_PASSWORD',
  VERIFICATION_OTP = 'VERIFICATION_OTP',
  BOTTOM_TAB = 'BOTTOM_TAB',
  /**
   * AUTH
   */

  // truck stack
  TRUCK_STACK = 'TRUCK_STACK',
  HOME = 'HOME',

  // route stack
  ROUTE_STACK = 'ROUTE_STACK',

  // time stack
  TIME_STACK = 'TIME_STACK',

  // report stack
  REPORT_STACK = 'REPORT_STACK',

  // setting stack
  SETTING_STACK = 'SETTING_STACK',
  SETTING = 'SETTING',
}

export type TUnAuthorizeParamsList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.SIGN_UP]: undefined;
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.BOTTOM_TAB]: undefined;
  [APP_SCREEN.FORGOT_PASSWORD]: undefined;
  [APP_SCREEN.CREATE_NEW_PASSWORD]: { email: string; code: string };
  [APP_SCREEN.VERIFICATION_OTP]: { email: string; type: 'FORGOT' | 'SIGN_UP' };
};

export type TAuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.SETTING]: undefined;
};

export type TRootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.AUTHORIZE]: undefined;
} & TUnAuthorizeParamsList &
  TAuthorizeParamsList;
