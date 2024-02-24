import { IProduct } from '@/interfaces/product.interface';

export enum EActionType {
  ADD_TO_CART = 'add_to_cart',
  BUY_NOW = 'buy_now',
}

export enum EOrderType {
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
}

export type TDataAction = {
  isVisible: boolean;
  actionType: EActionType;
  orderType: EOrderType;
  product: IProduct | undefined;
};
