import {
  CommunityIcon,
  FavoriteIcon,
  FitIcon,
  OrderIcon,
  PointsIcon,
  PresentIcon,
  RankingIcon,
  WatchedIcon,
} from '@/assets/icons';
import { EGeneral } from '@/common';
import { GENERAL_OPTIONS } from '@/common/constants/common';
import { Box, Button, TextField } from '@/components';
import theme from '@/helpers/theme';

export const General: React.FC = () => {
  const _renderIcon = (type: EGeneral) => {
    switch (type) {
      case EGeneral.COMMUNITY:
        return <CommunityIcon width={30} height={30} />;
      case EGeneral.ACCUMULATE_POINTS:
        return <PointsIcon width={30} height={30} />;
      case EGeneral.ORDER:
        return <OrderIcon width={30} height={30} />;
      case EGeneral.PRESENT:
        return <PresentIcon width={30} height={30} />;
      case EGeneral.WATCHED:
        return <WatchedIcon width={30} height={30} />;
      case EGeneral.FAVORITE:
        return <FavoriteIcon width={30} height={30} />;
      case EGeneral.FIT:
        return <FitIcon width={30} height={30} />;
      case EGeneral.BUY_A_LOT:
        return <RankingIcon width={30} height={30} />;
      default:
        <CommunityIcon />;
    }
  };

  return (
    <Box direction='row' between middle wrap p={12}>
      {GENERAL_OPTIONS.map((item, index) => (
        <Box key={index}>
          <Button border borderColor={item.color} p={18} borderRadius={16}>
            {_renderIcon(item.value)}
          </Button>
          <TextField color={theme.colors.textColor} size={14} mv={12} centered>
            {item.label}
          </TextField>
        </Box>
      ))}
    </Box>
  );
};
