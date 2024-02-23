import { TickActiveIcon } from '@/assets/icons';
import { Box, Button, ListView, TextField } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError } from '@/helpers/toast';
import { IProduct } from '@/interfaces/product.interface';
import { APP_SCREEN } from '@/navigators/screen-types';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartItem, ERemoveType, Header, IRemoveModalRef, RemoveModal } from './components';
import styles from './styles';

const ShoppingCart = React.memo(() => {
  const insets = useSafeAreaInsets();
  const removeModalRef = useRef<IRemoveModalRef>(null);

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const _onSelectProducts = (product: IProduct) => {
    setSelectedProducts((prev) => {
      const newSelected = [...prev];
      const selectedFileIndex = prev.findIndex((item) => item === product);
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

  const _onCheckout = () => {
    if (selectedProducts.length < 1) {
      showError('Vui lòng chọn sản phẩm!');
      return;
    }
    navigate(APP_SCREEN.CHECKOUT_SCREEN, { products: selectedProducts });
  };

  const _renderFooter = useCallback(() => {
    if (!false) {
      return null;
    }
    return <ActivityIndicator color={theme.colors.primary} />;
  }, []);

  return (
    <Box flex={1} pt={insets.top} color={theme.colors.backgroundColor} between>
      <Box color={theme.colors.lightSixColor} flex={1}>
        <Box pb={16} ph={16} color={theme.colors.backgroundColor}>
          <Header onRemove={() => _onRemoveItem(ERemoveType.ALL_ITEM)} />
        </Box>
        <ListView
          keyExtractor={(item) => item}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CartItem
              product={item}
              isSelected={selectedProducts.includes(item)}
              onSelectProducts={_onSelectProducts}
              onRemoveItem={() => _onRemoveItem(ERemoveType.ONE_ITEM, item.id)}
            />
          )}
          contentContainerStyle={styles.containerItem}
          // onEndReached={_onLoadMore}
          // onRefresh={_onRefresh}
          ListFooterComponent={_renderFooter}
        />
      </Box>
      <Box ph={16} gap={8} pv={8}>
        <Box direction='row' color={theme.colors.backgroundColor} between middle>
          <Box gap={8}>
            <Button direction='row' middle gap={8}>
              <TickActiveIcon />
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
          0 d
        </TextField>
      </Box>
      <RemoveModal ref={removeModalRef} />
    </Box>
  );
});

export default ShoppingCart;
