import { Box, Button, Modal, TextField } from '@/components';
import theme from '@/helpers/theme';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { IAction, IConfirmModalRef } from './types';

const INITIAL_ACTIONS: IAction = {
  isVisible: false,
  conversationId: undefined,
};

export const ConfirmModal = forwardRef<IConfirmModalRef>(({}, ref) => {
  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const { isVisible, conversationId } = actions;

  useImperativeHandle(
    ref,
    () => ({
      onShowModal: (isVisible, conversationId) => {
        setActions({
          isVisible,
          conversationId,
        });
      },
    }),
    [],
  );

  const _onConfirm = () => {};

  return (
    <Modal
      isVisible={isVisible}
      entering={SlideInDown.stiffness(300)}
      exiting={SlideOutDown.stiffness(300)}
      onBackdropPress={() => setActions(INITIAL_ACTIONS)}
    >
      <Box borderRadius={16} color={theme.colors.backgroundColor} pv={24} mh={16} ph={24} centered>
        <TextField centered fontFamily={theme.fonts.medium} size={24} color={theme.colors.primary}>
          Xoá bỏ cuộc hội thoại?
        </TextField>
        <TextField centered pv={16} size={16} color={theme.colors.textColor}>
          Bạn chắc chắn muốn xóa vĩnh viễn cuộc trò chuyện này?
        </TextField>
        <Box direction='row' middle style={{ gap: 16 }}>
          <Button
            flex={1}
            middle
            color={theme.colors.lightOneColor}
            pv={10}
            borderRadius={8}
            onPress={() => setActions(INITIAL_ACTIONS)}
            centered
          >
            <TextField fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
              Huỷ
            </TextField>
          </Button>
          <Button
            flex={1}
            middle
            color={theme.colors.primary}
            pv={10}
            borderRadius={8}
            onPress={_onConfirm}
          >
            <TextField color={theme.colors.backgroundColor} fontFamily={theme.fonts.medium}>
              Xoá
            </TextField>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});
