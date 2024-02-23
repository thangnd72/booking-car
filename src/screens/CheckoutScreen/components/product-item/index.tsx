import { numberWithCommas } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import theme from '@/helpers/theme';
import { IProduct } from '@/interfaces/product.interface';
import styles from './styles';

interface IProps {
  product: IProduct;
}

export const ProductItem: React.FC<IProps> = ({ product }) => {
  return (
    <Button
      direction='row'
      middle
      gap={12}
      color={theme.colors.backgroundColor}
      pv={8}
      borderRadius={8}
    >
      <Box direction='row' gap={12} middle>
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
        </Box>
        <TextField color={theme.colors.darkSixColor}>x1</TextField>
      </Box>
    </Button>
  );
};
