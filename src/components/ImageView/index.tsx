import { CloseIcon } from '@/assets/icons';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../Box';
import { Button } from '../Button';
import { FastImg } from '../FastImage';
import { Modal } from '../Modal';
import { styles } from './styles';

interface IProps {
  isVisible: boolean;
  imageUrls: string[];
  onDismiss: () => void;
}

export const ImageView: React.FC<IProps> = ({ isVisible = false, imageUrls, onDismiss }) => {
  const insets = useSafeAreaInsets();

  const _renderHeader = () => {
    return (
      <Button
        mt={insets.top - 14}
        style={{ position: 'absolute', right: 0, zIndex: 1000 }}
        ph={16}
        onPress={onDismiss}
      >
        <CloseIcon stroke={theme.colors.white} />
      </Button>
    );
  };

  const _renderFooter = (currentIndex: number) => {
    return (
      <Box
        mb={insets.bottom + 20}
        mh={16}
        border
        borderWidth={3}
        borderRadius={16}
        borderColor={theme.colors.primary}
      >
        <FastImg pictureStyle={styles.pictureImg} uri={imageUrls[currentIndex]} />
      </Box>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      entering={SlideInRight.stiffness(300)}
      exiting={SlideOutRight.stiffness(300)}
    >
      <Box w={SIZE.SCREEN_WIDTH} h={SIZE.SCREEN_HEIGHT}>
        <ImageViewer
          imageUrls={imageUrls.map((item) => ({ url: item }))}
          onCancel={onDismiss}
          useNativeDriver
          renderHeader={_renderHeader}
          renderFooter={_renderFooter}
        />
      </Box>
    </Modal>
  );
};
