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
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { Box } from '../Box';

interface ITextInputComponentProps extends TextInputProps {
  name: string;
  leftLabel?: string;
  rightLabel?: string;
  placeHolder?: string;
  onChangeValue?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  customTextInputStyle?: Pick<TextInputProps, 'style'>;
  multiline?: boolean;
  numberOfLines?: number;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  type?: ETypeField;
  editable?: boolean;
  onPressIn?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  wrapperStyle?: ViewStyle;
  rules?: RegisterOptions<FieldValues, string>;
  required?: boolean;
  control: Control<any>;
  showRequiredMark?: boolean;
}

export const TextInputField: React.FC<ITextInputComponentProps> = React.memo(
  ({
    name,
    leftLabel,
    rightLabel,
    placeHolder,
    onChangeValue,
    keyboardType = 'default',
    customTextInputStyle,
    multiline = false,
    numberOfLines,
    onSubmitEditing,
    type = ETypeField.TEXT,
    editable = true,
    onPressIn,
    iconRight,
    iconLeft,
    wrapperStyle,
    rules,
    required,
    control,
    showRequiredMark = false,
    ...restProps
  }) => {
    const [hidden, setHidden] = React.useState(false);
    const [isFocus, setIsFocus] = React.useState<boolean>(false);

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
          {leftLabel && (
            <Box flex={1} direction='row'>
              <TextField style={styles.leftLabel}>{leftLabel}</TextField>
              {showRequiredMark && <Text style={{ color: theme.colors.errorColor }}> *</Text>}
            </Box>
          )}
          {rightLabel && <TextField style={styles.rightLabel}>{rightLabel}</TextField>}
        </View>
        <Controller
          control={control}
          rules={{ ...rules }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <View style={containerStyle}>
                {iconLeft && <View style={styles.iconRight}>{iconLeft}</View>}
                <TextInput
                  value={value}
                  keyboardType={keyboardType as any}
                  placeholderTextColor={theme.colors.lightOneColor}
                  style={[textInputStyle]}
                  onBlur={() => {
                    onBlur();
                    setIsFocus(false);
                  }}
                  onFocus={() => setIsFocus(true)}
                  onChangeText={onChange}
                  placeholder={placeHolder}
                  multiline={multiline}
                  secureTextEntry={type === ETypeField.PASSWORD && !hidden && true}
                  editable={editable ?? true}
                  onSubmitEditing={onSubmitEditing}
                  onPressIn={onPressIn}
                  {...restProps}
                />
                {type === ETypeField.PASSWORD && (
                  <Pressable style={styles.iconRight} onPress={_handleShowPassword}>
                    {ShowHidePasswordIcon({ show: hidden })}
                  </Pressable>
                )}
                {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
              </View>
              {error?.message ? <Text style={styles.errorText}>{error?.message}</Text> : null}
            </>
          )}
          name={name}
        />
      </View>
    );
  },
);
