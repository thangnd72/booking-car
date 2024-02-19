import { SearchIcon } from '@/assets/icons';
import { DEFAULT_GET_LIST_PARAMS } from '@/common/constants/common';
import { Box, Button, FloatActionButton, ListView } from '@/components';
import theme from '@/helpers/theme';
import useAuth from '@/hooks/useAuth';
import { TGetListProductParams } from '@/interfaces/product.interface';
import { ProductItem } from '@/shared';
import { TRootState, useAppDispatch } from '@/stores';
import { EProductActions, getListProductAction, getProductCategoryAction } from '@/stores/product';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Category, Header } from './components';
import styles from './styles';
import { getListRoleAction } from '@/stores/client';

const HomeScreen = React.memo(() => {
  const insets = useSafeAreaInsets();
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const [queryParams, setQueryParams] =
    React.useState<TGetListProductParams>(DEFAULT_GET_LIST_PARAMS);

  const { productCategories } = useSelector((state: TRootState) => state.product);
  const { productList } = useSelector((state: TRootState) => state.product);
  const loadingProduct = useSelector(
    (state: TRootState) => state.loading[EProductActions.GET_LIST_PRODUCT],
  );

  const _init = async () => {
    await Promise.all([
      dispatch(getProductCategoryAction({ ...DEFAULT_GET_LIST_PARAMS, size: 20 })),
      dispatch(getListRoleAction({})),
    ]);
  };

  const _getListProduct = (params: TGetListProductParams) => {
    dispatch(getListProductAction(params));
  };

  const _onRefresh = () => {
    setQueryParams({ ...DEFAULT_GET_LIST_PARAMS });
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

  React.useEffect(() => {
    _init();
  }, []);

  return (
    <Box flex={1} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box ph={16}>
        <Header />
        <Button
          direction='row'
          middle
          color={theme.colors.lightFourColor}
          ph={16}
          h={45}
          borderRadius={10}
        >
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder='Tìm kiếm sản phẩm'
            placeholderTextColor={theme.colors.darkTwoColor}
            onChangeText={_onChangeKeyword}
          />
        </Button>
      </Box>
      <Category categories={productCategories.data} />

      <Box color={theme.colors.lightSixColor} flex={1}>
        <ListView
          keyExtractor={(item) => item.id}
          data={productList.data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <ProductItem product={item} />}
          numColumns={2}
          contentContainerStyle={styles.containerItem}
          style={styles.wrapperProduct}
          onEndReached={_onLoadMore}
          onRefresh={_onRefresh}
          ListFooterComponent={_renderFooter}
        />
        {isAuth && <FloatActionButton />}
      </Box>
    </Box>
  );
});
export default HomeScreen;
