import React from 'react';
import styles from './styles';
import { Box, Button, FastImg, Spacer, TextField, TextInputField } from '@/components';
import { useForm } from 'react-hook-form';
import { validationError, validationSchema } from '@/common';
import { ILoginFormData } from '@/interfaces/auth.interfaces';
import theme from '@/helpers/theme';
import { ETypeField } from '@/components/TextInput/types';

const HomeScreen: React.FC = () => {
  return (
    <Box flex ph={24} pt={40}>
      <TextField mb={32} size={32} fontFamily={theme.fonts.regular} centered>
        Home
      </TextField>
    </Box>
  );
};
export default HomeScreen;
