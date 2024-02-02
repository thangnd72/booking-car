import Animations from '@/assets/animations';
import { TRootState } from '@/stores';
import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';

export const LoadingScreen = React.memo(() => {
  const { loading } = useSelector((state: TRootState) => state.client);

  if (loading) {
    return (
      <View style={styles.containLoading}>
        <LottieView
          style={styles.lottieView}
          source={Animations.loading}
          autoPlay
          loop
          duration={2000}
        />
      </View>
    );
  }

  return null;
});
