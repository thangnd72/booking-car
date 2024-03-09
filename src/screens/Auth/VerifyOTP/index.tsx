import { ForgotPasswordIcon } from '@/assets/icons';
import { Box, Button, TextField } from '@/components';
import theme from '@/helpers/theme';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';
import { navigate } from '@/helpers/GlobalNavigation';
import { APP_SCREEN } from '@/navigators/screen-types';

interface IParms {
  email: string;
}
export const VerifyOTPScreen: React.FC = () => {
  const { params } = useRoute();
  const { email } = (params as IParms) ?? { email: '' };
  const [value, setValue] = React.useState<string>('');

  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <Box p={16} flex={1} color={theme.colors.backgroundColor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box middle>
          <ForgotPasswordIcon />
        </Box>
        <TextField color={theme.colors.darkTwoColor} size={14} mb={8}>
          Nhập mã OTP được gửi đến email của bạn
        </TextField>
        <TextField color={theme.colors.darkTwoColor} size={14} mb={24}>
          {`OTP sẽ hết hạn sau: `}
          <TextField
            color={theme.colors.textColor}
            fontFamily={theme.fonts.medium}
          >{`2.00`}</TextField>
        </TextField>

        <Box>
          <TextField color={theme.colors.textColor} mb={8}>
            Mã OTP
          </TextField>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            // rootStyle={styles.codeFieldRoot}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={({ index, symbol, isFocused }) => (
              <TextField
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </TextField>
            )}
          />
        </Box>
        <Box direction='row' middle centered mt={24}>
          <TextField color={theme.colors.textColor} size={14}>
            {`Không nhận được mã? `}
          </TextField>
          <TextField color={theme.colors.blueOneColor} size={14} decorationLine={'underline'}>
            Gửi lại
          </TextField>
        </Box>
        <Button
          onPress={() => navigate(APP_SCREEN.CREATE_NEW_PASSWORD)}
          h={44}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={32}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Tiếp tục
          </TextField>
        </Button>
      </ScrollView>
    </Box>
  );
};
