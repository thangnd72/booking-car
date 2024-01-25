import React, { forwardRef } from 'react';
import { ScrollViewProps } from 'react-native';

import Animated from 'react-native-reanimated';

interface StackViewProps extends ScrollViewProps {
  children?: React.ReactNode;
}

export const StackView = forwardRef(
  ({ children, ...rest }: StackViewProps, ref: React.ForwardedRef<Animated.ScrollView>) => {
    // render
    return (
      <Animated.ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        {...rest}
      >
        {children}
      </Animated.ScrollView>
    );
  },
);
