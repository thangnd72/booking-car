import { SendIcon } from '@/assets/icons';
import { AppHeader, Box, Button } from '@/components';
import theme from '@/helpers/theme';
import { TRootState } from '@/stores';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { MessageItem } from './components';
import styles from './styles';

type TMessageDetailsParams = {
  conversationId: number;
  type: 'group' | 'message';
};

const data = [
  {
    id: '1',
    content:
      'Cam on ban da tin tuong va su dung dich vu cua shop, chung toi da ghi nhan don dat hang cua ban vaf se som phan hoi cho ban',
    author: {
      id: '1210430865524391936',
      name: 'Thang',
    },
  },
  {
    id: '2',
    content: 'Hoa nay ban nhu nào a? Cua hang minh ban si khong, em muon mua so luong lon.',
    author: {
      id: '1',
      name: 'Thang',
    },
  },
  {
    id: '3',
    content: 'Em muon mua?',
    author: {
      id: '1',
      name: 'Thang',
    },
  },
  {
    id: '4',
    content: 'Hoa rat dep, de em 100 bo',
    author: {
      id: '1',
      name: 'Thang',
    },
  },
];

const MessageDetails = React.memo(() => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { conversationId, type } = params as TMessageDetailsParams;
  const insets = useSafeAreaInsets();
  const { profile } = useSelector((state: TRootState) => state.client);

  const [messageTxt, setMessageTxt] = useState<string>('');

  const [conversation, setConversation] = useState<any>();

  // const getConversationDetail = useCallback(async () => {
  //   const url =
  //     type === 'message'
  //       ? ApiConstants.CONVERSATION_DETAIL.replace('{id}', conversationId.toString())
  //       : ApiConstants.GROUP_DETAIL.replace('{id}', conversationId.toString());

  //   const response = await NetWorkService.Get<IConversations | IGroupsConversations>({
  //     url,
  //   });

  //   if (response?.status && response.data) {
  //     setConversation(response.data);
  //   }
  // }, [conversationId]);

  const showAvt = useCallback((current: any, index: number) => {
    const prevMessage = data[index - 1];

    return current?.author?.id !== prevMessage?.author?.id;
  }, []);

  const _renderMessage: ListRenderItem<any> = ({ item, index }) => {
    return <MessageItem data={item} profile={profile!} showAvt={showAvt(item, index)} />;
  };

  // const _onEndReached = useCallback(() => {
  //   if (messages.metadata && messages.metadata?.page <= messages.metadata?.totalPage) {
  //     dispatch(
  //       getMessage({
  //         id: conversationId,
  //         page: messages.metadata?.page + 1,
  //       }),
  //     );
  //   }
  // }, [messages.metadata]);

  // const _renderFooter = useCallback(() => {
  //   if (!loadmore) {
  //     return null;
  //   }

  //   return <ActivityIndicator />;
  // }, [loadmore]);

  // if (!messages.messages) {
  //   return <Empty />;
  // }

  return (
    <Box flex={1} justifyContent='flex-end' color={theme.colors.white}>
      <AppHeader title='Hỗ trợ trực tuyến' />
      {/* {messages?.messages && ( */}
      <FlatList
        keyExtractor={(item) => item.id}
        inverted
        style={styles.containerMessage}
        data={data}
        onEndReachedThreshold={0.8}
        renderItem={_renderMessage}
        // onEndReached={_onEndReached}
        // ListFooterComponent={_renderFooter}
      />
      {/* )} */}

      <Box
        pb={insets.bottom + 5}
        mh={16}
        justifyContent='flex-end'
        style={{ borderStyle: 'solid' }}
      >
        <Box direction='row' middle centered gap={10} style={{ maxHeight: 150 }}>
          <TextInput
            value={messageTxt}
            onChangeText={(txt) => setMessageTxt(txt)}
            style={styles.input}
            multiline
            placeholder='Gửi tin nhắn'
          />
          <Button
            activeOpacity={messageTxt.trim() === '' ? 1 : 0}
            disabled={messageTxt?.trim() === ''}
            onPress={() => {}}
          >
            <SendIcon fill={messageTxt?.trim() === '' ? theme.colors.lightOneColor : undefined} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default MessageDetails;
