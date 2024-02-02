/* eslint-disable react/react-in-jsx-scope */
import { BackIcon } from '@/assets/icons';
import { Box } from '@/components';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StackNavigationOptions } from '@react-navigation/stack';

const HeaderBack = () => (
  <Box
    hitSlop={{
      top: 15,
      left: 15,
      right: 15,
      bottom: 15,
    }}
    pl={20}
  >
    <BackIcon />
  </Box>
);

export const headerOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: SIZE.sizeScale(22),
    color: theme.colors.darkOneColor,
    paddingHorizontal: SIZE.scaleW(20),
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerBackImage: HeaderBack,
};
