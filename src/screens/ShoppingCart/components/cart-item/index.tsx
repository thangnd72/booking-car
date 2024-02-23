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
import { IProduct } from '@/interfaces/product.interface';
import styles from './styles';

interface IProps {
  product: IProduct;
  isSelected: boolean;
  onSelectProducts: (product: IProduct) => void;
  onRemoveItem: () => void;
}

export const CartItem: React.FC<IProps> = ({
  product,
  isSelected = false,
  onSelectProducts,
  onRemoveItem,
}) => {
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
            uri='https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg'
          />
          <Box flex={1} gap={6}>
            <TextField
              numberOfLines={2}
              color={theme.colors.textColor}
              size={16}
              fontFamily={theme.fonts.medium}
            >
              Thanh Lieu Moc chau (29999 canh`)
            </TextField>
            <TextField color={theme.colors.primary}>{`${numberWithCommas(188995)} đ`}</TextField>
            <Box direction='row' middle between mt={4}>
              <Box direction='row' middle gap={16}>
                <Button border borderRadius={100} borderColor={theme.colors.lightTwoColor} p={1}>
                  <MinusIcon width={20} height={20} />
                </Button>
                <TextField color={theme.colors.textColor}>1</TextField>
                <Button border borderRadius={100} borderColor={theme.colors.lightTwoColor} p={1}>
                  <AddBlackIcon width={20} height={20} />
                </Button>
              </Box>
              <Button
                borderRadius={15}
                border
                p={2}
                borderColor={theme.colors.lightTwoColor}
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
