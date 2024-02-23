import { ArrowLeftIcon, NoteIcon, RedLocationIcon } from '@/assets/icons';
import { Box, Button, TextField, TextInputField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { IProduct } from '@/interfaces/product.interface';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductItem } from './components';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

interface IParms {
  products: IProduct[];
}

const CheckoutScreen = React.memo(() => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute();
  const { products } = (params as IParms) ?? [];

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
          <Button direction='row' gap={8} ph={16}>
            <RedLocationIcon />
            <Box gap={6}>
              <TextField color={theme.colors.textColor}>Thông tin người nhận</TextField>
              <TextField color={theme.colors.darkSixColor}>Vui lòng chọn người nhận</TextField>
            </Box>
          </Button>
          <Box h={1} flex={1} color={theme.colors.lightSixColor} mv={8} />
          <Box gap={8} ph={16}>
            {products && products.map((item) => <ProductItem key={item.id} product={item} />)}
          </Box>
          <Box h={1} flex={1} color={theme.colors.lightSixColor} mv={8} />
          <Box direction='row' ph={16} gap={8}>
            <NoteIcon />
            <Box gap={6} flex={1}>
              <TextField color={theme.colors.textColor} mt={4}>
                Ghi chú
              </TextField>
              <TextInput style={styles.textInput} />
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
              0 d
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
    </Box>
  );
});

export default CheckoutScreen;
