import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './styles';
import { TextField } from '../TextField';
import theme from '@/helpers/theme';

export type TopTab = {
  label: string;
};

interface TopTabBarProps {
  tabs: TopTab[];
  onPressTab: (index: number) => void;
  selectedIndex: number;
  style?: StyleProp<ViewStyle>;
  tabBarContainerStyle?: StyleProp<ViewStyle>;
}

export const TopTabBar = ({
  tabs,
  onPressTab,
  selectedIndex,
  style,
  tabBarContainerStyle,
}: TopTabBarProps) => {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          delayPressIn={250}
          style={tabBarContainerStyle}
          onPress={() => onPressTab(index)}
        >
          <View style={[styles.container, index === selectedIndex && styles.selected]}>
            <TextField
              color={
                index === selectedIndex ? theme.colors.darkOneColor : theme.colors.darkThreeColor
              }
              style={styles.text}
            >
              {tab.label}
            </TextField>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
