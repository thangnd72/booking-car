import { CloseIcon, MinusIcon, PlusIcon } from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, FastImg, Modal, TextField } from '@/components';
import theme from '@/helpers/theme';
import { IProduct } from '@/interfaces/product.interface';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import styles from './styles';
import { EActionType, TDataAction } from './types';

export interface ICartModalRef {
  onShowModal(isVisible: boolean, actionType: EActionType, product: IProduct | undefined): void;
}

const INITIAL_ACTIONS: TDataAction = {
  isVisible: false,
  actionType: EActionType.ADD_TO_CART,
  product: undefined,
};

export const CartModal = forwardRef<ICartModalRef>(({}, ref) => {
  const [actions, setActions] = useState<TDataAction>(INITIAL_ACTIONS);
  const [quantity, setQuantity] = useState<number>(1);

  useImperativeHandle(
    ref,
    () => ({
      onShowModal: (isVisible, actionType, product) => {
        setActions({
          isVisible,
          actionType,
          product,
        });
      },
    }),
    [],
  );

  const _onIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const _onDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Modal
      isVisible={actions.isVisible}
      entering={SlideInDown.stiffness(300)}
      exiting={SlideOutDown.stiffness(300)}
    >
      <Box borderRadius={24} color={theme.colors.backgroundColor} p={16} mh={16} centered>
        <Box direction='row' gap={8} between>
          <Box direction='row' gap={8}>
            <FastImg pictureStyle={styles.coverPhoto} uri={actions.product?.imageUrls[0] || ''} />
            <Box>
              <TextField size={18} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
                {actions.product?.name}
              </TextField>
              <TextField size={16} pv={6} color={theme.colors.primary}>{`${numberWithCommas(
                actions.product?.basePrice || 0,
              )}đ`}</TextField>
              <TextField
                size={12}
                color={theme.colors.darkSixColor}
              >{`Số lượng: ${actions.product?.quantity}`}</TextField>
              <Box
                direction='row'
                between
                middle
                border
                borderColor={theme.colors.primary}
                mv={16}
                w={120}
                pv={4}
                borderRadius={6}
              >
                <Button ph={8} onPress={_onDecreaseQuantity}>
                  <MinusIcon width={20} height={20} />
                </Button>
                <TextField color={theme.colors.textColor}>{quantity}</TextField>
                <Button ph={8} onPress={_onIncreaseQuantity}>
                  <PlusIcon width={20} height={20} />
                </Button>
              </Box>
            </Box>
          </Box>
          <Button onPress={() => setActions(INITIAL_ACTIONS)}>
            <CloseIcon width={20} />
          </Button>
        </Box>
        <Button middle centered color={theme.colors.primary} pv={12} borderRadius={12}>
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            {actions.actionType === EActionType.ADD_TO_CART ? 'Thêm vào giỏ hàng' : 'Mua ngay'}
          </TextField>
        </Button>
      </Box>
    </Modal>
  );
});
