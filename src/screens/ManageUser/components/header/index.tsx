import { ArrowLeftIcon } from '@/assets/icons';
import { Box, Button, TextField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';

export const Header: React.FC = () => {
  return (
    <Box direction='row' middle gap={8} between>
      <Button onPress={goBack}>
        <ArrowLeftIcon />
      </Button>
      <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
        Danh sách người dùng
      </TextField>
      <Box w={24} />
    </Box>
  );
};
