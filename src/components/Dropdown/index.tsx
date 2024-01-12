import React, { FC, ReactElement, useRef, useState } from 'react';
import { FlatList, Modal, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { styles } from './styles';
import { TSelectItem } from './types';
import { TextField } from '../TextField';
import { ArrowDownIcon } from '@/assets/icons';

interface Props {
  label: string;
  placeHolder?: string;
  options: TSelectItem[];
  selectedValue?: string;
  errorMessage?: string | boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  onSelect: (item: TSelectItem) => void;
}

export const Dropdown: FC<Props> = ({
  label,
  placeHolder = '',
  errorMessage = false,
  options,
  selectedValue,
  wrapperStyle,
  onSelect,
}) => {
  const DropdownButtonRef = useRef<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [dropdownTop, setDropdownTop] = useState<number>(0);

  const selectedItem = options.find((option) => option.value === selectedValue);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButtonRef?.current?.measure(
      (_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
        setDropdownTop(py + h / 2 + 2);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: any) => {
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }: { item: TSelectItem }): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType='none'>
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(_item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={wrapperStyle}>
      <TextField style={styles.label}>{label}</TextField>
      <TouchableOpacity ref={DropdownButtonRef} style={styles.button} onPress={toggleDropdown}>
        {renderDropdown()}
        <Text style={styles.buttonText}>
          {(!!selectedItem && selectedItem.label) || placeHolder}
        </Text>
        <ArrowDownIcon style={styles.icon} />
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};
