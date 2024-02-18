import { DEFAULT_GET_LIST_PARAMS } from '@/common/constants/common';
import { Box, Empty, ListView } from '@/components';
import theme from '@/helpers/theme';
import { TCommonGetListParams } from '@/interfaces/common.interface';
import { TGetListProductParams } from '@/interfaces/product.interface';
import { ProductItem } from '@/shared';
import { TRootState, useAppDispatch } from '@/stores';
import { EProductActions, getListProductAction } from '@/stores/product';
import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

interface IProps {
  categoryId: string;
  keyword?: string;
}

export const ProductList = React.memo(({ categoryId, keyword }: IProps) => {
  const dispatch = useAppDispatch();

  const [queryParams, setQueryParams] = React.useState<TGetListProductParams>({
    ...DEFAULT_GET_LIST_PARAMS,
    categoryId,
  });

  const { productList } = useSelector((state: TRootState) => state.product);
  const loadingProduct = useSelector(
    (state: TRootState) => state.loading[EProductActions.GET_LIST_PRODUCT],
  );

  const _getListProduct = (params: TCommonGetListParams) => {
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

  React.useEffect(() => {
    setQueryParams({ ...queryParams, page: 0, query: keyword });
  }, [keyword]);

  React.useEffect(() => {
    _getListProduct(queryParams);
  }, [queryParams]);

  return (
    <Box color={theme.colors.lightSixColor} flex={1}>
      {productList.data.length > 0 ? (
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
      ) : (
        <>{!loadingProduct && <Empty />}</>
      )}
    </Box>
  );
});
