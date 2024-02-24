import { ArrowRightIcon, CartIcon, MessageIcon, StarIcon } from '@/assets/icons';
import { Box, Button, Spacer, TextField } from '@/components';
import theme from '@/helpers/theme';
import { TRootState, useAppDispatch } from '@/stores';
import { EProductActions, getProductDetailAction } from '@/stores/product';
import React, { useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '@/common';
import { useRoute } from '@react-navigation/native';
import { CartModal, ICartModalRef } from '@/shared';
import { EActionType, EOrderType } from '@/shared/CartModal/types';
import { Header } from './components';

interface IParms {
  productId: string;
}

const ProductDetails = React.memo(() => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { params } = useRoute();
  const { productId } = params as IParms;

  const cartModalRef = useRef<ICartModalRef>(null);

  const { productDetail } = useSelector((state: TRootState) => state.product);
  const loading = useSelector(
    (state: TRootState) => state.loading[EProductActions.GET_PRODUCT_DETAIL],
  );

  const _onAddToCart = (type: EActionType) => {
    if (!productDetail) return;
    cartModalRef.current?.onShowModal(true, type, EOrderType.TODAY, productDetail);
  };

  React.useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, [productId]);

  if (loading) {
    return (
      <Box flex={1} middle centered>
        <ActivityIndicator color={theme.colors.primary} />
      </Box>
    );
  }

  return (
    <Box flex={1} color={theme.colors.lightSixColor} between>
      <Box>
        <Header product={productDetail} />
        <Box color={theme.colors.backgroundColor}>
          <Box direction='row' middle p={16}>
            <TextField size={15} color={theme.colors.primary}>{`${numberWithCommas(
              productDetail?.basePrice || 0,
            )}đ`}</TextField>
          </Box>
          <TextField ph={16} color={theme.colors.textColor} fontFamily={theme.fonts.bold}>
            {productDetail?.name}
          </TextField>
          <Spacer height={16} />
          <Box h={1} color={theme.colors.lightTwoColor} />
          <Box direction='row' ph={16} middle between>
            <Box gap={8} pv={8} direction='row' middle>
              <StarIcon />
              <TextField size={14} color={theme.colors.darkTwoColor}>
                5.0(10 đánh giá) | 668 đã bán
              </TextField>
            </Box>
            <ArrowRightIcon width={20} />
          </Box>
        </Box>
      </Box>
      <Box direction='row' color={theme.colors.backgroundColor} pb={insets.bottom}>
        <Box direction='row' middle justifyContent='space-evenly' flex={1} pv={10}>
          <Button onPress={() => _onAddToCart(EActionType.ADD_TO_CART)}>
            <CartIcon />
          </Button>
          <Box h={30} w={1} color={theme.colors.lightOneColor} />
          <Button>
            <MessageIcon />
          </Button>
        </Box>
        <Button
          color={theme.colors.primary}
          middle
          centered
          flex={1}
          onPress={() => _onAddToCart(EActionType.BUY_NOW)}
        >
          <TextField color={theme.colors.white} fontFamily={theme.fonts.medium} size={15}>
            Mua ngay
          </TextField>
        </Button>
      </Box>
      <CartModal ref={cartModalRef} />
    </Box>
  );
});
export default ProductDetails;
