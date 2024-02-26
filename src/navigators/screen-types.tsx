import { IProduct } from '@/interfaces/product.interface';

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

  // home stack
  HOME_STACK = 'HOME_STACK',
  HOME = 'HOME',
  PRODUCT_BY_CATEGORY = 'PRODUCT_BY_CATEGORY',
  MANAGE_USER = 'MANAGE_USER',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  SHOPPING_CART = 'SHOPPING_CART',
  CHECKOUT_SCREEN = 'CHECKOUT_SCREEN',

  // home stack
  ORDER_STACK = 'ORDER_STACK',
  PRODUCT_BY_DAY = 'PRODUCT_BY_DAY',

  // notification stack
  PLAN_STACK = 'PLAN_STACK',
  PLAN_PRODUCT = 'PLAN_PRODUCT',

  // setting
  SETTING_STACK = 'SETTING_STACK',
  SETTING = 'SETTING',
  PROFILE = 'PROFILE',
  USER_DETAIL_SCREEN = 'USER_DETAIL_SCREEN',
  SYNCHRONIZED = 'SYNCHRONIZED',
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
  [APP_SCREEN.PRODUCT_BY_DAY]: undefined;
  [APP_SCREEN.PLAN_PRODUCT]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.SETTING]: undefined;
  [APP_SCREEN.PRODUCT_BY_CATEGORY]: { categoryId: string };
  [APP_SCREEN.MANAGE_USER]: undefined;
  [APP_SCREEN.PRODUCT_DETAIL]: { productId: string };
  [APP_SCREEN.SHOPPING_CART]: undefined;
  [APP_SCREEN.CHECKOUT_SCREEN]: { products: IProduct[] };
  [APP_SCREEN.USER_DETAIL_SCREEN]: { userId: string };
  [APP_SCREEN.SYNCHRONIZED]: undefined;
};

export type TRootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.AUTHORIZE]: undefined;
} & TUnAuthorizeParamsList &
  TAuthorizeParamsList;
