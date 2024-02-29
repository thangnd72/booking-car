import { ArrowLeftIcon, NoteIcon, RedLocationIcon } from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, TextField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { IProductItem } from '@/interfaces/cart.interface';
import { useRoute } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IReceiverModalRef, ProductItem, ReceiverModal } from './components';
import styles from './styles';

interface IParms {
  products: IProductItem[];
}

const CheckoutScreen = React.memo(() => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute();
  const { products } = (params as IParms) ?? [];

  const addressModalRef = useRef<IReceiverModalRef>(null);

  const grandTotal = useMemo(() => {
    return products.reduce(
      (accumulator, currentValue) => accumulator + (currentValue?.totalPrice || 0),
      0,
    );
  }, [products]);

  return (
    <Box flex={1} pt={insets.top} between color={theme.colors.backgroundColor}>
      <Box flex={1}>
        <Box direction='row' middle between pb={16} ph={16}>
          <Button onPress={goBack}>
            <ArrowLeftIcon />
          </Button>
          <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
            Thanh toán
          </TextField>
          <Box w={24} />
        </Box>
        <ScrollView>
          <Button
            direction='row'
            gap={8}
            ph={16}
            onPress={() => addressModalRef.current?.onShowModal(true)}
          >
            <RedLocationIcon />
            <Box gap={6}>
              <TextField color={theme.colors.textColor}>Thông tin người nhận</TextField>
              <TextField color={theme.colors.darkSixColor}>Vui lòng chọn người nhận</TextField>
            </Box>
          </Button>
          <Box h={1} flex={1} color={theme.colors.lightSixColor} mv={8} />
          <Box gap={8} ph={16}>
            {products &&
              products.map((item) => <ProductItem key={item.productId} product={item} />)}
          </Box>
          <Box h={1} flex={1} color={theme.colors.lightSixColor} mv={8} />
          <Box direction='row' ph={16} gap={8}>
            <NoteIcon />
            <Box gap={6} flex={1}>
              <TextField color={theme.colors.textColor} mt={4}>
                Ghi chú
              </TextField>
              <TextInput style={styles.textInput} placeholder='Nhập ghi chú' />
            </Box>
          </Box>
        </ScrollView>
      </Box>
      <Box
        gap={8}
        pv={8}
        borderTopWidth={1}
        borderColor={theme.colors.lightSevenColor}
        pb={insets.bottom + 10}
      >
        <Box direction='row' color={theme.colors.backgroundColor} between middle ph={16}>
          <Box gap={8}>
            <TextField color={theme.colors.textColor}>Tổng tiền</TextField>
            <TextField fontFamily={theme.fonts.medium} color={theme.colors.secondary} size={16}>
              {`${numberWithCommas(grandTotal || 0)} đ`}
            </TextField>
          </Box>
          <Button
            color={theme.colors.primary}
            middle
            centered
            ph={32}
            h={44}
            borderRadius={12}
            onPress={() => {}}
          >
            <TextField color={theme.colors.white} fontFamily={theme.fonts.medium} size={16}>
              Đặt hàng
            </TextField>
          </Button>
        </Box>
      </Box>
      <ReceiverModal ref={addressModalRef} />
    </Box>
  );
});

export default CheckoutScreen;
