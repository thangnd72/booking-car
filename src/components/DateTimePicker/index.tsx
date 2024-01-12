import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import styles from './styles';
import { TextField } from '../TextField';
import { CalendarIcon } from '@/assets/icons';

interface IProps extends Omit<DatePickerProps, 'date'> {
  time?: Date | '';
  pickerMode: 'time' | 'date' | 'datetime' | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  leftLabel?: string;
  rightLabel?: string;
  hasIconLeft?: boolean;
  hasIconRight?: boolean;
  errorMessage?: string | boolean;
  onDateChange: (time: Date) => void;
}

export const DateTimePicker: React.FC<IProps> = ({
  time,
  pickerMode,
  containerStyle,
  leftLabel,
  rightLabel,
  hasIconLeft = false,
  hasIconRight = false,
  errorMessage,
  onDateChange,
  ...rest
}) => {
  const value = time ? time : new Date();
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const onConfirmDate = (date: Date) => {
    onDateChange(date);
    setOpenDatePicker(false);
  };

  const onOpenDatePicker = () => {
    setOpenDatePicker(true);
  };

  const onCancel = () => {
    setOpenDatePicker(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelWrapper}>
        {leftLabel && <TextField style={styles.leftLabel}>{leftLabel}</TextField>}
        {rightLabel && <TextField style={styles.rightLabel}>{rightLabel}</TextField>}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.datePickerContainer}
        onPress={onOpenDatePicker}
      >
        {hasIconLeft && (
          <View style={styles.iconRight}>
            <CalendarIcon />{' '}
          </View>
        )}
        <TextField style={styles.dateTxt}>
          {time ? dayjs(value).format('MM/DD/YYYY') : ''}
        </TextField>
        <View>
          <DatePicker
            {...rest}
            date={value}
            open={openDatePicker}
            modal
            mode={pickerMode}
            minuteInterval={5}
            androidVariant='iosClone'
            textColor={theme.colors.darkOneColor}
            style={{ width: SIZE.SCREEN_WIDTH }}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
          />
        </View>
        {hasIconRight && (
          <View style={styles.iconRight}>
            <CalendarIcon />
          </View>
        )}
      </TouchableOpacity>
      {errorMessage ? <TextField style={styles.errorText}>{errorMessage}</TextField> : null}
    </View>
  );
};
