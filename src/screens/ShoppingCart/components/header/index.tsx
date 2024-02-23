import { ArrowLeftIcon, TrashIcon } from '@/assets/icons';
import { Box, Button, TextField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';

interface IProps {
  onRemove: () => void;
}

export const Header: React.FC<IProps> = ({ onRemove }) => {
  return (
    <Box direction='row' middle between gap={8}>
      <Button onPress={goBack}>
        <ArrowLeftIcon />
      </Button>
      <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
        Giỏ hàng
      </TextField>
      <Box direction='row' gap={12}>
        <Button onPress={onRemove}>
          <TrashIcon width={24} />
        </Button>
      </Box>
    </Box>
  );
};
