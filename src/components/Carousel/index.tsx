import { SIZE } from '@/helpers/size';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box } from '../Box';
import { Button } from '../Button';
import { styles } from './styles';

interface ICarouselComponentProps {
  images: { url: string; link: string }[];
  duration?: number;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
  onPressBanner: (url: string) => void;
}

export const Carousel: React.FC<ICarouselComponentProps> = React.memo(
  ({ images, duration = 3000, height, containerStyle, onPressBanner }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const scrollRef = React.useRef<ScrollView>(null);
    const intervalRef = React.useRef<any>(false);

    React.useEffect(() => {
      _onAutoScroll();
      return () => {
        _onStopAutoScroll();
      };
    }, [duration, images]);

    const _onStopAutoScroll = () => {
      clearInterval(intervalRef.current);
    };

    const _onAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setSelectedIndex((prev) => {
          const newIndex = prev === images.length - 1 ? 0 : prev + 1;
          scrollRef.current?.scrollTo({
            animated: true,
            y: 0,
            x: (SIZE.SCREEN_WIDTH - SIZE.scaleW(32)) * newIndex,
          });
          return newIndex;
        });
      }, duration);
    };

    const onMomentumScrollEnd = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const viewSize = nativeEvent.layoutMeasurement.width;
      const contentOffset = nativeEvent.contentOffset.x;
      const index = Math.round(contentOffset / viewSize);
      if (index !== selectedIndex) setSelectedIndex(index);
    };

    return (
      <Box style={containerStyle}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          bounces
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollBeginDrag={_onStopAutoScroll}
          onScrollEndDrag={_onAutoScroll}
          scrollEventThrottle={16}
          style={styles.container}
        >
          {images.map((image, index) => (
            <Button key={index} onPress={() => onPressBanner(image.link)}>
              <FastImage style={[styles.imageCarousel, { height }]} source={{ uri: image.url }} />
            </Button>
          ))}
        </ScrollView>
        <Box style={styles.circleDiv}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dotCircle, { opacity: selectedIndex === index ? 1 : 0.5 }]}
            />
          ))}
        </Box>
      </Box>
    );
  },
);

Carousel.displayName = 'CarouselComponent';

export default Carousel;
