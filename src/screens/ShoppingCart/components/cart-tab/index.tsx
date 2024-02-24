import { TextField } from '@/components';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { ICartType } from '@/interfaces/cart.interface';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import styles from './styles';

interface TabBarProps {
  tabs: ICartType[];
  style?: StyleProp<ViewStyle>;
  tabBarContainerStyle?: StyleProp<ViewStyle>;
  scrollX: SharedValue<number>;
  refStack: any;
}

export const CartTab = forwardRef(({ tabs, style, scrollX, refStack }: TabBarProps, ref) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const onChangeTab = useCallback((tab: number) => {
    setSelectedTabIndex(tab);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onChangeTab,
    }),
    [],
  );

  const onPressTab = (tabIndex: number) => {
    if (selectedTabIndex !== Math.abs(tabIndex)) {
      setSelectedTabIndex(Math.abs(tabIndex));
      refStack.current?.scrollTo({
        x: Math.abs(tabIndex) * SIZE.WIDTH,
        animated: true,
      });
    }
  };

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          delayPressIn={250}
          style={[styles.tabBarItem, selectedTabIndex === index ? styles.selected : undefined]}
          onPress={() => onPressTab(index)}
        >
          <View style={[styles.container]}>
            <TextField
              size={16}
              color={index === selectedTabIndex ? theme.colors.primary : theme.colors.textColor}
              style={styles.text}
            >
              {tab.value}
            </TextField>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});
