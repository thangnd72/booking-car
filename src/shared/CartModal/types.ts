import { IProduct } from '@/interfaces/product.interface';

export enum EActionType {
  ADD_TO_CART = 'add_to_cart',
  BUY_NOW = 'buy_now',
}

export type TDataAction = {
  isVisible: boolean;
  actionType: EActionType;
  product: IProduct | undefined;
};
