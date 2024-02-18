import { SearchIcon } from '@/assets/icons';
import { DEFAULT_GET_LIST_PARAMS } from '@/common/constants/common';
import { Box, ListView, TextField } from '@/components';
import theme from '@/helpers/theme';
import { TCommonGetListParams } from '@/interfaces/common.interface';
import { TRootState, useAppDispatch } from '@/stores';
import { EClientActions, getListUserAction } from '@/stores/client';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Header, UserItem } from './components';
import styles from './styles';

const ManageUser = React.memo(() => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const [queryParams, setQueryParams] =
    React.useState<TCommonGetListParams>(DEFAULT_GET_LIST_PARAMS);

  const { listUser } = useSelector((state: TRootState) => state.client);
  const loadingUser = useSelector(
    (state: TRootState) => state.loading[EClientActions.GET_LIST_USER],
  );

  const _getListUser = (params: TCommonGetListParams) => {
    dispatch(getListUserAction(params));
  };

  const _onRefresh = () => {
    setQueryParams({ ...DEFAULT_GET_LIST_PARAMS });
  };

  const _renderFooter = useCallback(() => {
    if (!loadingUser) {
      return null;
    }
    return <ActivityIndicator color={theme.colors.primary} />;
  }, [loadingUser]);

  const _onLoadMore = () => {
    if (loadingUser) {
      return;
    }
    if (listUser.page <= listUser?.totalPages) {
      dispatch(
        getListUserAction({
          ...queryParams,
          page: listUser.page + 1,
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
    _getListUser(queryParams);
  }, [queryParams]);

  return (
    <Box flex={1} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box ph={16} pt={16}>
        <Header />
        <Box
          mt={10}
          borderRadius={24}
          border
          borderColor={theme.colors.darkFiveColor}
          ph={16}
          h={45}
          middle
          direction='row'
        >
          <SearchIcon width={20} />
          <TextInput
            value={queryParams.query}
            style={styles.searchInput}
            placeholder='Tìm kiếm người dùng'
            placeholderTextColor={theme.colors.darkTwoColor}
            onChangeText={_onChangeKeyword}
          />
        </Box>
      </Box>
      <ListView
        keyExtractor={(item) => item.id}
        data={listUser.data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <UserItem user={item} />}
        contentContainerStyle={styles.containerItem}
        onEndReached={_onLoadMore}
        onRefresh={_onRefresh}
        ListFooterComponent={_renderFooter}
      />
    </Box>
  );
});
export default ManageUser;
