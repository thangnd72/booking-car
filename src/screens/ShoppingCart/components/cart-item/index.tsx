import {
  AddBlackIcon,
  MinusIcon,
  TickActiveIcon,
  TickInactiveIcon,
  TrashIcon,
} from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import theme from '@/helpers/theme';
import { showError } from '@/helpers/toast';
import { IProductItem } from '@/interfaces/cart.interface';
import { TRootState, useAppDispatch } from '@/stores';
import { getListCartAction, updateCartAction } from '@/stores/cart';
import { useSelector } from 'react-redux';
import styles from './styles';

interface IProps {
  product: IProductItem;
  isSelected: boolean;
  selectedTabId: number;
  onSelectProducts: (product: IProductItem) => void;
  onRemoveItem: () => void;
}

export const CartItem: React.FC<IProps> = ({
  product,
  isSelected = false,
  selectedTabId,
  onSelectProducts,
  onRemoveItem,
}) => {
  const dispatch = useAppDispatch();

  const { shoppingCart } = useSelector((state: TRootState) => state.cart);

  const _onUpdateQuantity = (type: 'minus' | 'plus') => {
    if (!shoppingCart || (type === 'minus' && product.quantity <= 1)) return;

    const currentIndexProduct = shoppingCart.items.findIndex(
      (e) => e.productId === product.productId && e.type === selectedTabId,
    );

    if (currentIndexProduct !== -1) {
      const listProduct = [...shoppingCart.items];
      listProduct[currentIndexProduct] = {
        ...product,
        quantity: type === 'minus' ? product.quantity - 1 : product.quantity + 1,
      };
      dispatch(
        updateCartAction({
          items: listProduct,
          onSuccess: () => {
            dispatch(getListCartAction({}));
          },
          onError: (err) => showError(err.message),
        }),
      );
    }
  };

  return (
    <Box
      direction='row'
      middle
      gap={12}
      color={theme.colors.backgroundColor}
      p={16}
      borderRadius={8}
      style={styles.shadow}
    >
      <Button onPress={() => onSelectProducts(product)}>
        {isSelected ? <TickActiveIcon /> : <TickInactiveIcon />}
      </Button>
      <Box flex={1}>
        <Box direction='row' gap={12}>
          <FastImg
            pictureStyle={styles.flowerImg}
            uri={
              product.imageUrls[0] ||
              'https://hinhnen4k.com/wp-content/uploads/2023/02/hinh-nen-dien-thoai-hoa-1.jpg'
            }
          />
          <Box flex={1} gap={6}>
            <TextField
              numberOfLines={2}
              color={theme.colors.textColor}
              size={16}
              fontFamily={theme.fonts.medium}
            >
              {product.name}
            </TextField>
            <TextField color={theme.colors.primary}>{`${numberWithCommas(
              product.price,
            )} đ`}</TextField>
            <Box direction='row' middle between mt={4}>
              <Box direction='row' middle gap={16}>
                <Button
                  border
                  borderRadius={100}
                  borderColor={theme.colors.lightThreeColor}
                  p={1}
                  onPress={() => _onUpdateQuantity('minus')}
                >
                  <MinusIcon width={20} height={20} />
                </Button>
                <TextField color={theme.colors.textColor}>{product.quantity}</TextField>
                <Button
                  border
                  borderRadius={100}
                  borderColor={theme.colors.lightThreeColor}
                  p={1}
                  onPress={() => _onUpdateQuantity('plus')}
                >
                  <AddBlackIcon width={20} height={20} />
                </Button>
              </Box>
              <Button
                borderRadius={15}
                border
                p={2}
                borderColor={theme.colors.lightThreeColor}
                onPress={onRemoveItem}
              >
                <TrashIcon width={20} height={20} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
