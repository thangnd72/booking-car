import { ArrowLeftIcon, SearchIcon } from '@/assets/icons';
import { DEFAULT_GET_LIST_PARAMS } from '@/common/constants/common';
import { Box, ListView, TextField, Button } from '@/components';
import theme from '@/helpers/theme';
import { TCommonGetListParams } from '@/interfaces/common.interface';
import { TRootState, useAppDispatch } from '@/stores';
import { EClientActions, getListUserAction } from '@/stores/client';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { goBack, navigate } from '@/helpers/GlobalNavigation';
import styles from './styles';
import { ConversationItem } from './components';
import { APP_SCREEN } from '@/navigators/screen-types';

const ConversationScreen = React.memo(() => {
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

  const _onNavigateMessageDetail = () => {
    navigate(APP_SCREEN.MESSAGE_DETAIL, { conversationId: 1 });
  };

  // React.useEffect(() => {
  //   _getListUser(queryParams);
  // }, [queryParams]);

  return (
    <Box flex={1} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box ph={16} pt={16}>
        <Box direction='row' middle gap={8} between>
          <Button onPress={goBack}>
            <ArrowLeftIcon />
          </Button>
          <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
            Cuộc hội thoại
          </TextField>
          <Box w={24} />
        </Box>
        <Button
          mt={10}
          direction='row'
          middle
          color={theme.colors.lightSevenColor}
          ph={16}
          h={45}
          borderRadius={10}
        >
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder='Tìm kiếm cuộc hội thoại'
            placeholderTextColor={theme.colors.darkTwoColor}
            onChangeText={_onChangeKeyword}
          />
        </Button>
      </Box>
      <ListView
        keyExtractor={(item) => item.id}
        data={[1, 2, 3, 4, 5]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ConversationItem onClick={_onNavigateMessageDetail} />}
        contentContainerStyle={styles.containerItem}
        // onEndReached={_onLoadMore}
        // onRefresh={_onRefresh}
        // ListFooterComponent={_renderFooter}
      />
    </Box>
  );
});
export default ConversationScreen;
