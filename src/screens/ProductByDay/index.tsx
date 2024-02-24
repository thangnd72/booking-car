import { SearchIcon } from '@/assets/icons';
import { DEFAULT_GET_LIST_PARAMS } from '@/common/constants/common';
import { Box, Button, Empty, ListView } from '@/components';
import theme from '@/helpers/theme';
import { TGetListProductParams } from '@/interfaces/product.interface';
import { ProductItem } from '@/shared';
import { TRootState, useAppDispatch } from '@/stores';
import { EProductActions, getListProductTomorrowAction } from '@/stores/product';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import styles from './styles';

const ProductByDay = React.memo(() => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [queryParams, setQueryParams] = React.useState<TGetListProductParams>({
    ...DEFAULT_GET_LIST_PARAMS,
    tomorrow: true,
  });

  const { productTomorrow } = useSelector((state: TRootState) => state.product);
  const loadingProduct = useSelector(
    (state: TRootState) => state.loading[EProductActions.GET_LIST_PRODUCT],
  );

  const _getListProduct = (params: TGetListProductParams) => {
    dispatch(getListProductTomorrowAction(params));
  };

  const _onRefresh = () => {
    setQueryParams({ ...DEFAULT_GET_LIST_PARAMS, tomorrow: true });
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
    if (productTomorrow.page <= productTomorrow?.totalPages) {
      dispatch(
        getListProductTomorrowAction({
          ...queryParams,
          page: productTomorrow.page + 1,
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
        <Button direction='row' middle h={45} borderRadius={10}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder='Tìm kiếm sản phẩm'
            placeholderTextColor={theme.colors.darkTwoColor}
            onChangeText={_onChangeKeyword}
          />
        </Button>
      </Box>
      <Box color={theme.colors.lightSixColor} flex={1}>
        {productTomorrow.data.length > 0 ? (
          <ListView
            keyExtractor={(item) => item.id}
            data={productTomorrow.data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <ProductItem product={item} />}
            numColumns={2}
            contentContainerStyle={styles.containerItem}
            style={styles.wrapperProduct}
            onEndReached={_onLoadMore}
            onRefresh={_onRefresh}
            ListFooterComponent={_renderFooter}
          />
        ) : (
          <>{!loadingProduct && <Empty />}</>
        )}
      </Box>
    </Box>
  );
});
export default ProductByDay;
