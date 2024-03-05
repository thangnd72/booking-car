import { Box, TextField } from '@/components';
import theme from '@/helpers/theme';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TruckScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <Box flex ph={16} pt={insets.top}>
      {/* <Header /> */}
      <TextField mb={32} size={32} fontFamily={theme.fonts.regular} centered>
        Home
      </TextField>
    </Box>
  );
};
export default TruckScreen;
