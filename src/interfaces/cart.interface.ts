export interface IUpdateCartParams {
  items: IProductItem[];
  totalPrice?: number;
  totalItems?: number;
}

export interface IProductItem {
  productId: string;
  quantity: number;
  price: number;
  totalPrice?: number;
  type: number;
}

export type TCartList = IUpdateCartParams;

export interface ICartType {
  key: string;
  value: string;
}
