import { ArrowLeftIcon, CartIcon } from '@/assets/icons';
import { Box, Button, FastImg, ImageView, TextField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

export const Header: React.FC = () => {
  return (
    <Box direction='row' middle gap={8}>
      <Button onPress={goBack}>
        <ArrowLeftIcon />
      </Button>
      <TextField>Giỏ hàng</TextField>
      <Box direction='row' gap={12}>
        <Button>
          <CartIcon width={24} />
        </Button>
      </Box>
    </Box>
  );
};
