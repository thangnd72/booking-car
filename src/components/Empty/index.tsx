import { ReactElement } from 'react';
import { Box } from '../Box';
import { TextField } from '../TextField';
import theme from '@/helpers/theme';
import { EmptySearchIcon } from '@/assets/icons';

interface IProps {
  title?: string;
  description?: string;
  icon?: ReactElement;
  colorText?: string;
}

export const Empty = ({ icon, title, description, colorText }: IProps) => {
  return (
    <Box flex={1} middle mt={45}>
      {icon ? icon : <EmptySearchIcon style={{ marginRight: 16 }} />}
      <TextField
        centered
        size={20}
        fontFamily={theme.fonts.medium}
        color={colorText || theme.colors.textColor}
        pb={8}
      >
        {title ? title : 'Danh sách trống!'}
      </TextField>
      <TextField centered mh={30} size={14} color={colorText || theme.colors.darkSixColor}>
        {description}
      </TextField>
    </Box>
  );
};
