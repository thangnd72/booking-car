import { Box, TextField } from '@/components';
import theme from '@/helpers/theme';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductByDay = React.memo(() => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} pt={insets.top} middle centered>
      <TextField size={36} color={theme.colors.textColor} fontFamily={theme.fonts.medium}>
        Product by day
      </TextField>
    </Box>
  );
});

export default ProductByDay;
