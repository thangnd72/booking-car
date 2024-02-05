import theme from '@/helpers/theme';
import { EGeneral } from './enum';

export const GENERAL_OPTIONS = [
  {
    label: 'Cộng đồng',
    value: EGeneral.COMMUNITY,
    color: theme.colors.primary,
  },
  {
    label: 'Tích điểm',
    value: EGeneral.ACCUMULATE_POINTS,
    color: theme.colors.secondary,
  },
  {
    label: 'Đơn hàng',
    value: EGeneral.ORDER,
    color: theme.colors.blueOne,
  },
  {
    label: 'Quà tặng',
    value: EGeneral.PRESENT,
    color: theme.colors.greenTwoColor,
  },
  {
    label: 'Đã xem',
    value: EGeneral.WATCHED,
    color: theme.colors.infoColor,
  },
  {
    label: 'Yêu thích',
    value: EGeneral.FAVORITE,
    color: theme.colors.mainDarkerColor,
  },
  {
    label: 'Phù hợp',
    value: EGeneral.FIT,
    color: theme.colors.primary,
  },
  {
    label: 'Mua nhiều',
    value: EGeneral.BUY_A_LOT,
    color: theme.colors.secondary,
  },
];
