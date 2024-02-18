import {
  TCommonGetListParams,
  TCommonGetListResponse,
  TPagination,
} from '@/interfaces/common.interface';
import { EGeneral } from './enum';

export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_ALL = 1000;

export const DEFAULT_PAGINATION: TPagination = {
  total: 1,
  totalPages: 1,
  page: 0,
};

export const DEFAULT_GET_LIST_PARAMS: TCommonGetListParams = {
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
};

export const DEFAULT_GET_LIST_RESPONSE: TCommonGetListResponse = {
  ...DEFAULT_PAGINATION,
  data: [],
};

export const GENERAL_OPTIONS = [
  {
    label: 'Cộng đồng',
    value: EGeneral.COMMUNITY,
    color: '#ffa503',
  },
  {
    label: 'Tích điểm',
    value: EGeneral.ACCUMULATE_POINTS,
    color: '#ff7f51',
  },
  {
    label: 'Đơn hàng',
    value: EGeneral.ORDER,
    color: '#f13e3e',
  },
  {
    label: 'Quà tặng',
    value: EGeneral.PRESENT,
    color: '#1990ff',
  },
  {
    label: 'Đã xem',
    value: EGeneral.WATCHED,
    color: '#76bee3',
  },
  {
    label: 'Yêu thích',
    value: EGeneral.FAVORITE,
    color: '#ff6465',
  },
  {
    label: 'Phù hợp',
    value: EGeneral.FIT,
    color: '#126ef1',
  },
  {
    label: 'Mua nhiều',
    value: EGeneral.BUY_A_LOT,
    color: '#ffb64c',
  },
];

export const CATEGORY_COLORS = [
  '#ffa503',
  '#ff7f51',
  '#f13e3e',
  '#1990ff',
  '#76bee3',
  '#ff6465',
  '#126ef1',
  '#ffb64c',
];
