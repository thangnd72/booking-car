import React from 'react';
import styles from './styles';
import { Box, Button, FastImg, Spacer, TextField, TextInputField } from '@/components';
import { useForm } from 'react-hook-form';
import { validationError, validationSchema } from '@/common';
import { ILoginFormData } from '@/interfaces/auth.interfaces';
import theme from '@/helpers/theme';
import { ETypeField } from '@/components/TextInput/types';
import { LogoApp, MessageIcon, NotificationIcon } from '@/assets/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './components';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <Box flex ph={16} pt={insets.top}>
      <Header />
      <TextField mb={32} size={32} fontFamily={theme.fonts.regular} centered>
        Home
      </TextField>
    </Box>
  );
};
export default HomeScreen;
