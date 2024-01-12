import { ShowHidePasswordIcon } from '@/assets/icons';
import theme from '@/helpers/theme';
import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { ETypeField } from './types';
import { styles } from './styles';
import { TextField } from '../TextField';

interface ITextInputComponentProps {
  leftLabel?: string;
  rightLabel?: string;
  placeHolder?: string;
  textValue?: string;
  onChangeValue?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  customTextInputStyle?: Pick<TextInputProps, 'style'>;
  multiline?: boolean;
  numberOfLines?: number;
  errorMessage?: string | boolean;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  type?: ETypeField;
  editable?: boolean;
  onPressIn?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  wrapperStyle?: ViewStyle;
}

export const TextInputField: React.FC<ITextInputComponentProps> = React.memo(
  ({
    leftLabel,
    rightLabel,
    placeHolder,
    onChangeValue,
    keyboardType = 'default',
    customTextInputStyle,
    multiline = false,
    numberOfLines,
    errorMessage,
    onSubmitEditing,
    type = ETypeField.TEXT,
    editable = true,
    textValue,
    onPressIn,
    iconRight,
    iconLeft,
    wrapperStyle,
  }) => {
    const [hidden, setHidden] = React.useState(false);
    const [value, setValueChange] = React.useState('');

    const _handleOnchangeText = (string: string) => {
      setValueChange(string);
      if (onChangeValue) {
        onChangeValue(string);
      }
    };
    const _handleShowPassword = () => {
      setHidden(!hidden);
    };

    let textInputStyle: TextStyle = { ...styles.textInput };
    if (customTextInputStyle) {
      textInputStyle = { ...textInputStyle, ...customTextInputStyle };
    }

    let containerStyle = { ...styles.container };
    if (multiline && numberOfLines) {
      numberOfLines > 5 ? 5 : numberOfLines;

      containerStyle = {
        ...containerStyle,
        height: 20 * numberOfLines + 16,
      };

      textInputStyle = {
        ...textInputStyle,
        height: 20 * numberOfLines + 16,
        verticalAlign: 'top',
      };
    }
    if (!iconLeft) {
      textInputStyle = {
        ...textInputStyle,
        paddingLeft: 16,
      };
    }

    return (
      <View style={wrapperStyle}>
        <View style={styles.label}>
          {leftLabel && <TextField style={styles.leftLabel}>{leftLabel}</TextField>}
          {rightLabel && <TextField style={styles.rightLabel}>{rightLabel}</TextField>}
        </View>
        <View style={containerStyle}>
          {iconLeft && <View style={styles.iconRight}>{iconLeft}</View>}
          <TextInput
            value={textValue && textValue !== '' ? textValue : value}
            keyboardType={keyboardType as any}
            placeholderTextColor={theme.colors.lightOneColor}
            style={[textInputStyle]}
            onChangeText={_handleOnchangeText}
            placeholder={placeHolder}
            multiline={multiline}
            secureTextEntry={type === ETypeField.PASSWORD && !hidden && true}
            editable={editable ?? true}
            onSubmitEditing={onSubmitEditing}
            onPressIn={onPressIn}
          />
          {type === ETypeField.PASSWORD && (
            <Pressable style={styles.iconRight} onPress={_handleShowPassword}>
              {ShowHidePasswordIcon({ show: hidden })}
            </Pressable>
          )}
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
    );
  },
);
