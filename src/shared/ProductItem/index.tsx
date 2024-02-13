import { AddIcon } from '@/assets/icons';
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
    <Button flex={1} borderRadius={16} color={theme.colors.backgroundColor} centered mh={6}>
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
          <Button color={theme.colors.primary} centered p={6} borderRadius={30}>
            <AddIcon />
          </Button>
        </Box>
      </Box>
    </Button>
  );
};
