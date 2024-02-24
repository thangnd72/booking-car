import { Box, Button, Modal, TextField } from '@/components';
import theme from '@/helpers/theme';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { ERemoveType, IAction, IRemoveModalRef } from './types';
import { IUpdateCartParams } from '@/interfaces/cart.interface';
import { TRootState, useAppDispatch } from '@/stores';
import { getListCartAction, updateCartAction } from '@/stores/cart';
import { showError, showSuccess } from '@/helpers/toast';
import { useSelector } from 'react-redux';

const INITIAL_ACTIONS: IAction = {
  isVisible: false,
  type: ERemoveType.ONE_ITEM,
  itemId: undefined,
};

export const RemoveModal = forwardRef<IRemoveModalRef>(({}, ref) => {
  const dispatch = useAppDispatch();

  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const { isVisible, type, itemId } = actions;

  const { shoppingCart } = useSelector((state: TRootState) => state.cart);

  useImperativeHandle(
    ref,
    () => ({
      onShowModal: (isVisible, type, itemId) => {
        setActions({
          isVisible,
          type,
          itemId,
        });
      },
    }),
    [],
  );

  const _onConfirmCleanCart = () => {
    const carts: IUpdateCartParams = {
      items: [],
    };
    dispatch(
      updateCartAction({
        ...carts,
        onSuccess: () => {
          setActions(INITIAL_ACTIONS);
          setTimeout(() => showSuccess('Xoá tất cả sản phầm thành công!'), 100);
          dispatch(getListCartAction({}));
        },
        onError: (err) => showError(err.message),
      }),
    );
  };

  const _onRemoveItem = () => {
    if (!shoppingCart) {
      return;
    }
    const newItems = shoppingCart.items.filter((e) => e.productId !== itemId);
    const carts: IUpdateCartParams = {
      items: newItems,
    };

    dispatch(
      updateCartAction({
        ...carts,
        onSuccess: () => {
          setActions(INITIAL_ACTIONS);
          setTimeout(() => showSuccess('Xoá sản phầm thành công!'), 100);
          dispatch(getListCartAction({}));
        },
        onError: (err) => showError(err.message),
      }),
    );
  };

  const _onConfirm = () => {
    if (type === ERemoveType.ALL_ITEM) {
      _onConfirmCleanCart();
    } else {
      _onRemoveItem();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      entering={SlideInDown.stiffness(300)}
      exiting={SlideOutDown.stiffness(300)}
      onBackdropPress={() => setActions(INITIAL_ACTIONS)}
    >
      <Box borderRadius={16} color={theme.colors.backgroundColor} pv={24} mh={16} ph={24} centered>
        <TextField centered fontFamily={theme.fonts.medium} size={24} color={theme.colors.primary}>
          Thông báo
        </TextField>
        <TextField centered pv={16} size={16} color={theme.colors.textColor}>
          {type === ERemoveType.ONE_ITEM
            ? 'Bạn có chắc chắn muốn xoá sản phẩm này không?'
            : 'Bạn có chắc chắn muốn xoá toàn bộ sản phẩm trong giỏ hàng không?'}
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
