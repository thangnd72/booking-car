import { EmptyCartIcon, TickActiveIcon, TickInactiveIcon } from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, Empty, ListView, StackView, TextField } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { showError } from '@/helpers/toast';
import { IProductItem } from '@/interfaces/cart.interface';
import { APP_SCREEN } from '@/navigators/screen-types';
import { TRootState } from '@/stores';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { CartItem, CartTab, ERemoveType, Header, IRemoveModalRef, RemoveModal } from './components';
import styles from './styles';

const ShoppingCart = React.memo(() => {
  const insets = useSafeAreaInsets();
  const removeModalRef = useRef<IRemoveModalRef>(null);
  const [selectedTabId, setSelectedTabId] = useState<number>(1);
  const scrollX = useSharedValue(0);
  const refStack = useRef<any>(null);
  const refTab = useRef<{ onChangeTab: (tab: number) => void }>();

  const { shoppingCart } = useSelector((state: TRootState) => state.cart);
  const { cartTypes } = useSelector((state: TRootState) => state.client);

  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<IProductItem[]>([]);

  const _onSelectProducts = (product: IProductItem) => {
    setSelectedProducts((prev) => {
      const newSelected = [...prev];
      const selectedFileIndex = prev.findIndex((item) => item.productId === product.productId);
      if (selectedFileIndex !== -1) {
        newSelected.splice(selectedFileIndex, 1);
      } else {
        newSelected.push(product);
      }
      return newSelected;
    });
  };

  const _onRemoveItem = (type: ERemoveType, itemId?: string) => {
    removeModalRef.current?.onShowModal(true, type, itemId);
  };

  const _onScroll = useCallback((event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  }, []);

  const _onMomentumScrollEnd = useCallback(({ nativeEvent }: any) => {
    const index = Math.round(nativeEvent.contentOffset.x / (SIZE.WIDTH - SIZE.scaleH(16)));
    setSelectedTabId(index === 0 ? 1 : 2);
    refTab.current?.onChangeTab(index);
    setSelectedProducts([]);
    setIsSelectAll(false);
  }, []);

  const _onCheckout = () => {
    if (selectedProducts.length < 1) {
      showError('Vui lòng chọn sản phẩm!');
      return;
    }
    navigate(APP_SCREEN.CHECKOUT_SCREEN, { products: selectedProducts });
  };

  const _onSelectAllProduct = () => {
    setIsSelectAll(!isSelectAll);
  };

  const grandTotal = useMemo(() => {
    return shoppingCart?.items
      .filter((e) => selectedProducts.map((e) => e.productId).includes(e.productId))
      .reduce((accumulator, currentValue) => accumulator + (currentValue?.totalPrice || 0), 0);
  }, [selectedProducts, shoppingCart?.items]);

  useEffect(() => {
    if (isSelectAll) {
      setSelectedProducts(shoppingCart?.items ?? []);
    } else {
      setSelectedProducts([]);
    }
  }, [isSelectAll]);

  return (
    <Box flex={1} pt={insets.top} color={theme.colors.backgroundColor} between>
      <Box color={theme.colors.lightSixColor} flex={1}>
        <Box pb={16} ph={16} color={theme.colors.backgroundColor}>
          <Header onRemove={() => _onRemoveItem(ERemoveType.ALL_ITEM)} />
        </Box>
        <CartTab ref={refTab} tabs={cartTypes} scrollX={scrollX} refStack={refStack} />
        <StackView
          ref={refStack}
          horizontal
          pagingEnabled
          onScroll={_onScroll}
          onMomentumScrollEnd={_onMomentumScrollEnd}
        >
          <Box style={{ width: SIZE.WIDTH }}>
            <ListView
              keyExtractor={(item) => item.productId}
              data={shoppingCart?.items.filter((item) => item.type === 1)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CartItem
                  product={item}
                  selectedTabId={selectedTabId}
                  isSelected={selectedProducts.map((e) => e.productId).includes(item.productId)}
                  onSelectProducts={_onSelectProducts}
                  onRemoveItem={() => _onRemoveItem(ERemoveType.ONE_ITEM, item.productId)}
                />
              )}
              contentContainerStyle={styles.containerItem}
              ListEmptyComponent={() => <Empty icon={<EmptyCartIcon />} title='Giỏ hàng trống!' />}
            />
          </Box>
          <Box style={{ width: SIZE.WIDTH }}>
            <ListView
              keyExtractor={(item) => item.productId}
              data={shoppingCart?.items.filter((item) => item.type === 2)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CartItem
                  product={item}
                  selectedTabId={selectedTabId}
                  isSelected={selectedProducts.includes(item)}
                  onSelectProducts={_onSelectProducts}
                  onRemoveItem={() => _onRemoveItem(ERemoveType.ONE_ITEM, item.id)}
                />
              )}
              contentContainerStyle={styles.containerItem}
              ListEmptyComponent={() => <Empty icon={<EmptyCartIcon />} title='Giỏ hàng trống!' />}
            />
          </Box>
        </StackView>
      </Box>
      <Box ph={16} gap={8} pv={8}>
        <Box direction='row' color={theme.colors.backgroundColor} between middle>
          <Box gap={8}>
            <Button direction='row' middle gap={8} onPress={_onSelectAllProduct}>
              {isSelectAll ? <TickActiveIcon /> : <TickInactiveIcon />}
              <TextField color={theme.colors.textColor}>Chọn tất cả</TextField>
            </Button>
            <TextField color={theme.colors.textColor}>Tổng tiền</TextField>
          </Box>
          <Button
            color={theme.colors.primary}
            middle
            centered
            ph={32}
            h={44}
            borderRadius={12}
            onPress={_onCheckout}
          >
            <TextField color={theme.colors.white} fontFamily={theme.fonts.medium} size={16}>
              Đặt hàng
            </TextField>
          </Button>
        </Box>
        <TextField
          pb={insets.bottom}
          fontFamily={theme.fonts.medium}
          color={theme.colors.secondary}
          size={16}
        >
          {`${numberWithCommas(grandTotal || 0)} đ`}
        </TextField>
      </Box>
      <RemoveModal ref={removeModalRef} />
    </Box>
  );
});

export default ShoppingCart;
