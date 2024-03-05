import theme from '@/helpers/theme';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Switch } from 'react-native-switch';
import { styles } from './styles';

export interface AppSwitchProps {
  active: boolean;
  disabled?: boolean;
  onValueChange?: (newValue: boolean) => void;
  style?: StyleProp<ViewStyle>;
  regularSize?: boolean;
}

export const AppSwitch: FC<AppSwitchProps> = ({ disabled, active, onValueChange, style }) => {
  return (
    <Switch
      disabled={disabled}
      activeText=''
      inActiveText=''
      circleSize={18}
      barHeight={25}
      switchLeftPx={3}
      switchRightPx={2.5}
      circleActiveColor={theme.colors.lightFiveColor}
      circleInActiveColor={theme.colors.lightOneColor}
      backgroundActive={theme.colors.primary}
      backgroundInactive={theme.colors.lightFiveColor}
      circleBorderWidth={0}
      switchWidthMultiplier={2.6}
      innerCircleStyle={active ? styles.circleActive : undefined}
      onValueChange={onValueChange}
      value={active}
      containerStyle={StyleSheet.flatten([
        styles.container,
        {
          borderColor: active ? theme.colors.primary : theme.colors.lightOneColor,
        },
        style,
      ])}
    />
  );
};
