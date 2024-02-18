import { Box, Button, TextField } from '@/components';
import theme from '@/helpers/theme';
import { TRootState } from '@/stores';
import { useRoute } from '@react-navigation/native';
import { debounce, get } from 'lodash';
import React, { useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const CheckoutScreen = React.memo(() => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} pt={insets.top}>
      <TextField>Checkout</TextField>
    </Box>
  );
});

export default CheckoutScreen;
