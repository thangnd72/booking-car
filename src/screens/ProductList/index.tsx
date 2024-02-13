import { SearchIcon } from '@/assets/icons';
import { Box, ListView } from '@/components';
import theme from '@/helpers/theme';
import { TRootState, useAppDispatch } from '@/stores';
import React, { useCallback } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './components';
import styles from './styles';
import { DEFAULT_GET_LIST_PARAMS } from '@/common/constants/common';
import { EProductActions, getListProductAction } from '@/stores/product';
import { setGlobalLoading } from '@/stores/client';
import { useSelector } from 'react-redux';
import { ProductItem } from '@/shared';
import { TCommonGetListParams } from '@/interfaces/common.interface';
import { round } from 'lodash';

const ProductList = React.memo(() => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const { productList, loadMoreList } = useSelector((state: TRootState) => state.product);
  const loadingProduct = useSelector(
    (state: TRootState) => state.loading[EProductActions.GET_LIST_PRODUCT],
  );

  const _getListProduct = () => {
    dispatch(getListProductAction(DEFAULT_GET_LIST_PARAMS));
  };

  const _onRefresh = () => {
    _getListProduct();
  };

  const _renderFooter = useCallback(() => {
    if (!loadingProduct) {
      return null;
    }
    return <ActivityIndicator color={theme.colors.primary} />;
  }, [loadingProduct]);

  const _onLoadMore = async () => {
    if (loadingProduct) {
      return;
    }
    if (productList.page <= productList?.totalPages) {
      dispatch(
        getListProductAction({
          ...DEFAULT_GET_LIST_PARAMS,
          page: productList.page + 1,
        }),
      );
    }
  };

  React.useEffect(() => {
    _getListProduct();
  }, []);

  return (
    <Box flex={1} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box ph={16}>
        <Header />
        <Box
          borderRadius={24}
          border
          borderColor={theme.colors.darkFiveColor}
          ph={16}
          pv={10}
          mv={10}
          middle
          direction='row'
        >
          <SearchIcon width={20} />
          <TextInput
            style={styles.searchInput}
            placeholder='Tìm kiếm sản phẩm'
            placeholderTextColor={theme.colors.darkTwoColor}
          />
        </Box>
      </Box>
      <Box color={theme.colors.lightSixColor} flex={1} pb={24}>
        <ListView
          keyExtractor={(item) => item.id}
          data={productList.data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <ProductItem product={item} />}
          numColumns={2}
          contentContainerStyle={styles.containerItem}
          style={styles.container}
          onEndReached={_onLoadMore}
          onRefresh={_onRefresh}
          ListFooterComponent={_renderFooter}
        />
      </Box>
    </Box>
  );
});
export default ProductList;
