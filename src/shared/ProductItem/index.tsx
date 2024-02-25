import { AddIcon } from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import useAuth from '@/hooks/useAuth';
import { IProduct } from '@/interfaces/product.interface';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useAppDispatch } from '@/stores';
import { setShowDialog } from '@/stores/client';
import { useRoute } from '@react-navigation/native';
import { useMemo, useRef } from 'react';
import { CartModal, ICartModalRef } from '../CartModal';
import { EActionType, EOrderType } from '../CartModal/types';
import styles from './styles';

interface IProps {
  product: IProduct;
}

export const ProductItem: React.FC<IProps> = ({ product }) => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const cartModalRef = useRef<ICartModalRef>(null);

  const { name } = useRoute();

  const _onPressProduct = () => {
    navigate(APP_SCREEN.PRODUCT_DETAIL, { productId: product.id });
  };

  const orderType = useMemo(() => {
    switch (name) {
      case APP_SCREEN.HOME:
      case APP_SCREEN.PRODUCT_BY_CATEGORY:
        return EOrderType.TODAY;

      case APP_SCREEN.PRODUCT_BY_DAY:
        return EOrderType.TOMORROW;

      default:
        return EOrderType.TODAY;
    }
  }, [name]);

  const _onAddToCart = () => {
    if (!isAuth) {
      dispatch(setShowDialog(true));
      return;
    }

    cartModalRef.current?.onShowModal(true, EActionType.ADD_TO_CART, orderType, product);
  };

  return (
    <>
      <Button
        borderRadius={16}
        color={theme.colors.backgroundColor}
        centered
        mh={6}
        onPress={_onPressProduct}
        style={styles.shadow}
      >
        <FastImg
          uri={
            product.imageUrls[0] ||
            'https://hinhnen4k.com/wp-content/uploads/2023/02/hinh-nen-dien-thoai-hoa-1.jpg'
          }
          pictureStyle={styles.thumbnail}
        />
        <Box gap={4} p={12}>
          <TextField numberOfLines={2} color={theme.colors.textColor} size={14}>
            {product.name}
          </TextField>
          <Box direction='row' between>
            <Box gap={6}>
              <TextField numberOfLines={2} color={theme.colors.darkSixColor} size={12}>
                {`Số lượng: ${product.quantity}`}
              </TextField>
              <TextField
                color={theme.colors.textColor}
                fontFamily={theme.fonts.bold}
              >{`${numberWithCommas(product.basePrice)}đ`}</TextField>
            </Box>
            <Button
              color={theme.colors.primary}
              centered
              p={6}
              borderRadius={30}
              onPress={_onAddToCart}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>
      </Button>
      <CartModal ref={cartModalRef} />
    </>
  );
};
