import theme from '@/helpers/theme';
import { EGeneral } from './enum';

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
