import { SearchIcon } from '@/assets/icons';
import { DEFAULT_GET_LIST_PARAMS } from '@/common/constants/common';
import { Box, ListView } from '@/components';
import theme from '@/helpers/theme';
import { TCommonGetListParams } from '@/interfaces/common.interface';
import { ProductItem } from '@/shared';
import { TRootState, useAppDispatch } from '@/stores';
import { EProductActions, getListProductAction } from '@/stores/product';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Header } from './components';
import styles from './styles';

const ProductList = React.memo(() => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const [queryParams, setQueryParams] =
    React.useState<TCommonGetListParams>(DEFAULT_GET_LIST_PARAMS);

  const { productList } = useSelector((state: TRootState) => state.product);
  const loadingProduct = useSelector(
    (state: TRootState) => state.loading[EProductActions.GET_LIST_PRODUCT],
  );

  const _getListProduct = (params: TCommonGetListParams) => {
    dispatch(getListProductAction(params));
  };

  const _onRefresh = () => {
    _getListProduct(DEFAULT_GET_LIST_PARAMS);
  };

  const _renderFooter = useCallback(() => {
    if (!loadingProduct) {
      return null;
    }
    return <ActivityIndicator color={theme.colors.primary} />;
  }, [loadingProduct]);

  const _onLoadMore = () => {
    if (loadingProduct) {
      return;
    }
    if (productList.page <= productList?.totalPages) {
      dispatch(
        getListProductAction({
          ...queryParams,
          page: productList.page + 1,
        }),
      );
    }
  };

  const debounceSearch = useCallback(
    debounce(async (keyword?: string) => {
      setQueryParams({ ...queryParams, page: 0, query: keyword });
    }, 500),
    [queryParams],
  );

  const _onChangeKeyword = (keyword: string) => {
    debounceSearch(keyword);
  };

  React.useEffect(() => {
    _getListProduct(queryParams);
  }, [queryParams]);

  return (
    <Box flex={1} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box ph={16}>
        <Header />
        <Box
          borderRadius={24}
          border
          borderColor={theme.colors.darkFiveColor}
          ph={16}
          h={45}
          mv={10}
          middle
          direction='row'
        >
          <SearchIcon width={20} />
          <TextInput
            style={styles.searchInput}
            placeholder='Tìm kiếm sản phẩm'
            placeholderTextColor={theme.colors.darkTwoColor}
            onChangeText={_onChangeKeyword}
          />
        </Box>
      </Box>
      <Box color={theme.colors.lightSixColor} flex={1}>
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
