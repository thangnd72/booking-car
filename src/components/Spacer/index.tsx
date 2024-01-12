import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SIZE } from '@/helpers/size';
import { ISpacerProps } from './type';

export const Spacer: React.FC<ISpacerProps> = ({ height = 0, width = 0 }) => {
  // style
  const actualStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: typeof width === 'number' ? SIZE.scaleW(width) : width,
      height: typeof height === 'number' ? SIZE.scaleH(height) : height,
    }),
    [height, width],
  );

  // render
  return <View style={actualStyle} />;
};
