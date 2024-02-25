import { TransformIcon } from '@/assets/icons';
import { numberWithCommas } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import theme from '@/helpers/theme';
import { IProduct } from '@/interfaces/product.interface';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from './styles';
import { forwardRef, useRef } from 'react';
import { IPlanModalRef, PlanModal } from '../plan-modal';

interface IProps {
  product: IProduct;
  onPressItem: () => void;
}

export interface IProductRef {
  close: () => void;
}

export const ProductItem: React.FC<IProps> = ({ product, onPressItem }) => {
  const planModalRef = useRef<IPlanModalRef>(null);
  const swipeRef = useRef<Swipeable>(null);

  const _onUpdateAction = () => {
    planModalRef.current?.onShowModal(true, product);
  };

  const _closeSwipeable = () => {
    if (swipeRef.current) {
      swipeRef.current.close();
    }
  };

  return (
    <Swipeable
      ref={swipeRef}
      key={product.id}
      renderRightActions={() => (
        <Button color={theme.colors.primary} w={76} onPress={_onUpdateAction} middle centered>
          <TransformIcon />
          <TextField size={14} mt={5} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Cập nhật
          </TextField>
        </Button>
      )}
    >
      <Button
        onPress={_closeSwipeable}
        direction='row'
        middle
        gap={12}
        color={theme.colors.backgroundColor}
        p={8}
      >
        <Box direction='row' gap={12} middle>
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
              product.basePrice,
            )} đ`}</TextField>
            <TextField
              size={12}
              color={theme.colors.darkSixColor}
            >{`Số lượng: ${product.quantity}`}</TextField>
          </Box>
        </Box>
      </Button>
      <PlanModal ref={planModalRef} closeSwipe={_closeSwipeable} />
    </Swipeable>
  );
};
