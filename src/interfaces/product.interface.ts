import { TCommonGetListParams } from './common.interface';

export interface IProduct {
  code: string;
  name: string;
  categoryId: string;
  categoryName: string;
  basePrice: number;
  isActive: boolean;
  type: number;
  imageUrls: string[];
  quantity: number;
  id: string;
  createdDate: string;
  lastModifiedDate: any;
}

export interface IProductCategory {
  name: string;
  parentId: string;
  rank: number;
  id: string;
  createdDate: string;
  lastModifiedDate: any;
}

export type TGetListProductParams = TCommonGetListParams & {
  categoryId?: string;
  tomorrow?: boolean;
};
