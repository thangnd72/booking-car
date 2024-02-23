import { AddIcon } from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { IProduct } from '@/interfaces/product.interface';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useRef } from 'react';
import { CartModal, ICartModalRef } from '../CartModal';
import { EActionType } from '../CartModal/types';
import styles from './styles';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/stores';
import { setShowDialog } from '@/stores/client';

interface IProps {
  product: IProduct;
}

export const ProductItem: React.FC<IProps> = ({ product }) => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const cartModalRef = useRef<ICartModalRef>(null);

  const _onPressProduct = () => {
    navigate(APP_SCREEN.PRODUCT_DETAIL, { productId: product.id });
  };

  const _onAddToCart = () => {
    if (!isAuth) {
      dispatch(setShowDialog(true));
      return;
    }
    cartModalRef.current?.onShowModal(true, EActionType.ADD_TO_CART, product);
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
        <FastImg uri={product.imageUrls[0] || ''} pictureStyle={styles.thumbnail} />
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
