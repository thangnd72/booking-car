import { ArrowLeftIcon, CartIcon } from '@/assets/icons';
import { Box, Button, FastImg, ImageView } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { IProduct } from '@/interfaces/product.interface';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { useState } from 'react';

interface IProps {
  product: IProduct | undefined;
}

export const Header: React.FC<IProps> = ({ product }) => {
  const insets = useSafeAreaInsets();
  const [isVisible, setVisible] = useState<boolean>(false);

  const _onViewImages = () => {
    setVisible(true);
  };

  const _onCloseViewImages = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onPress={_onViewImages}>
        <FastImg pictureStyle={styles.coverPhoto} uri={product?.imageUrls[0] || ''} />
        <Box flex={1} direction='row' between ph={16} style={styles.header}>
          <Button
            style={{ top: insets.top }}
            color={theme.colors.lightTwoColor}
            w={36}
            h={36}
            middle
            centered
            borderRadius={18}
            onPress={goBack}
          >
            <ArrowLeftIcon width={22} />
          </Button>
          <Button
            style={{ top: insets.top, left: SIZE.SCREEN_WIDTH - 112 }}
            color={theme.colors.lightTwoColor}
            w={36}
            h={36}
            middle
            centered
            borderRadius={18}
          >
            <CartIcon width={22} />
          </Button>
        </Box>
      </Button>
      {product?.imageUrls.length && (
        <ImageView
          isVisible={isVisible}
          imageUrls={product?.imageUrls}
          onDismiss={_onCloseViewImages}
        />
      )}
    </>
  );
};
