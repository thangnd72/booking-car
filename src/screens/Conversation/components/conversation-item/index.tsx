import { ArrowRightIcon, CloseIcon } from '@/assets/icons';
import { truncateString } from '@/common';
import { Box, Button, TextField } from '@/components';
import theme from '@/helpers/theme';
import React, { useRef } from 'react';
import FastImage from 'react-native-fast-image';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ConfirmModal } from '../confirm-modal';
import { IConfirmModalRef } from '../confirm-modal/types';

interface IProps {
  data?: any;
  profile?: any;
  onClick?: (data: any) => void;
}

export const ConversationItem = ({ data, profile, onClick }: IProps) => {
  // const { recipient, creator, lastMessageSent } = data;
  // const nameOfConversation = creator?.id === profile?.id ? recipient : creator;
  // const name = `${nameOfConversation?.username}`;

  const confirmModalRef = useRef<IConfirmModalRef>(null);

  return (
    <Swipeable
      enabled={true}
      renderRightActions={() => (
        <Button
          w={56}
          h={56}
          color={theme.colors.secondary}
          middle
          centered
          onPress={() => confirmModalRef.current?.onShowModal(true, '')}
        >
          <TextField size={12} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Xoá
          </TextField>
        </Button>
      )}
    >
      <Button
        direction='row'
        middle
        gap={10}
        mh={16}
        pb={10}
        mb={10}
        onPress={() => onClick?.(data)}
      >
        <FastImage
          source={{
            uri: 'https://hinhnen4k.com/wp-content/uploads/2023/02/hinh-nen-dien-thoai-hoa-1.jpg',
          }}
          style={{ width: 56, height: 56, borderRadius: 100 }}
        />

        <Box flex={1} direction='row'>
          <Box>
            <TextField
              size={16}
              numberOfLines={1}
              color={theme.colors.textColor}
              fontFamily={theme.fonts.medium}
            >
              {/* {name} */}
              Khách hàng 01
            </TextField>
            <Box direction='row' gap={10} pt={8}>
              {/* {!!lastMessageSent && ( */}
              <TextField size={12} color={theme.colors.darkThreeColor}>
                {truncateString('Tôi có thể mua hoa này như thế nào?', 20)}
              </TextField>
              {/* )} */}
              {/* {!!lastMessageSent?.createdAt && ( */}
              <TextField size={12} color={theme.colors.darkTwoColor}>
                {'1 giờ trước'}
              </TextField>
              {/* )} */}
            </Box>
          </Box>
        </Box>
        {/* <Box>
          <ArrowRightIcon />
        </Box> */}
      </Button>
      <ConfirmModal ref={confirmModalRef} />
    </Swipeable>
  );
};
