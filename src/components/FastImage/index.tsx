import React from 'react';
import { styles } from './styles';
import { ActivityIndicator, Animated, ViewStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import theme from '@/helpers/theme';

interface IFastImageComponentProps {
  uri: string;
  pictureStyle: ImageStyle;
  loadingStyleProps?: ViewStyle;
  children?: any;
}

export const FastImg: React.FC<IFastImageComponentProps> = ({
  children,
  uri,
  pictureStyle,
  loadingStyleProps,
}) => {
  const opacity = React.useRef(new Animated.Value(1)).current;

  const loadingStyle = React.useMemo(
    () => ({
      ...styles.loadingStyle,
      ...loadingStyleProps,
      opacity,
    }),
    [opacity, loadingStyleProps],
  );

  const handleFinishLoading = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <FastImage source={{ uri }} style={pictureStyle} onLoadEnd={handleFinishLoading}>
      {children}
      <Animated.View style={loadingStyle}>
        <ActivityIndicator size={'small'} color={theme.colors.primary} />
      </Animated.View>
    </FastImage>
  );
};
