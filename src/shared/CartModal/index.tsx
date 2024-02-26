import { CloseIcon, MinusIcon, PlusIcon } from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, FastImg, Modal, TextField } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { IUpdateCartParams } from '@/interfaces/cart.interface';
import { IProduct } from '@/interfaces/product.interface';
import { APP_SCREEN } from '@/navigators/screen-types';
import { TRootState, useAppDispatch } from '@/stores';
import { getListCartAction, updateCartAction } from '@/stores/cart';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import styles from './styles';
import { EActionType, EOrderType, TDataAction } from './types';

export interface ICartModalRef {
  onShowModal(
    isVisible: boolean,
    actionType: EActionType,
    orderType: EOrderType,
    product: IProduct | undefined,
  ): void;
}

const INITIAL_ACTIONS: TDataAction = {
  isVisible: false,
  actionType: EActionType.ADD_TO_CART,
  orderType: EOrderType.TODAY,
  product: undefined,
};

export const CartModal = forwardRef<ICartModalRef>(({}, ref) => {
  const dispatch = useAppDispatch();

  const [actions, setActions] = useState<TDataAction>(INITIAL_ACTIONS);
  const [quantity, setQuantity] = useState<number>(1);

  const { shoppingCart } = useSelector((state: TRootState) => state.cart);

  useImperativeHandle(
    ref,
    () => ({
      onShowModal: (isVisible, actionType, orderType, product) => {
        setActions({
          isVisible,
          actionType,
          orderType,
          product,
        });
      },
    }),
    [],
  );

  const _onIncreaseQuantity = () => {
    setQuantity((prev) => (actions.product?.quantity === prev ? prev : prev + 1));
  };

  const _onDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const _onCloseModal = () => {
    setActions(INITIAL_ACTIONS);
    setQuantity(1);
  };

  const _handleAddToCart = () => {
    const { product, orderType } = actions;

    if (!product) {
      return;
    }

    const carts: IUpdateCartParams = {
      items: [
        ...(shoppingCart?.items ?? []),
        {
          ...product,
          productId: product.id,
          quantity,
          price: product.basePrice,
          type: orderType === EOrderType.TODAY ? 1 : 2,
        },
      ],
    };

    dispatch(
      updateCartAction({
        ...carts,
        onSuccess: () => {
          _onCloseModal();
          setTimeout(() => showSuccess('Thêm vào giỏ hàng thành công!'), 100);

          dispatch(getListCartAction({}));
        },
        onError: (err) => showError(err.message),
      }),
    );
  };

  const _handleBuyNow = () => {
    const { product, orderType } = actions;
    if (!product) return;

    const products = [
      {
        productId: product.id,
        quantity,
        price: product.basePrice,
        type: orderType === EOrderType.TODAY ? 1 : 2,
      },
    ];

    _onCloseModal();
    navigate(APP_SCREEN.CHECKOUT_SCREEN, { products });
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
              <TextField
                size={18}
                fontFamily={theme.fonts.medium}
                color={theme.colors.textColor}
                numberOfLines={2}
                style={{ width: SIZE.WIDTH - 180 }}
              >
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
          <Button onPress={_onCloseModal}>
            <CloseIcon width={20} />
          </Button>
        </Box>
        <Button
          middle
          centered
          color={theme.colors.primary}
          pv={12}
          borderRadius={12}
          onPress={() => {
            if (actions.actionType === EActionType.ADD_TO_CART) {
              _handleAddToCart();
            } else {
              _handleBuyNow();
            }
          }}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            {actions.actionType === EActionType.ADD_TO_CART ? 'Thêm vào giỏ hàng' : 'Mua ngay'}
          </TextField>
        </Button>
      </Box>
    </Modal>
  );
});
