import { Box } from '@/components';
import { TRootState, useAppDispatch } from '@/stores';
import React, { createRef, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Header } from './components';

const ProductByCategory = React.memo(() => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const { productCategories } = useSelector((state: TRootState) => state.product);

  const tabs = useMemo(() => {
    return productCategories.data.map((entry) => ({
      label: entry.name,
      ref: createRef(),
    }));
  }, [productCategories]);

  return (
    <Box flex={1} ph={16} pt={insets.top}>
      <Header />
    </Box>
  );
});
export default ProductByCategory;
