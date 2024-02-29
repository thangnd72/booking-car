import { ArrowLeftIcon } from '@/assets/icons';
import { Box, Button, TextField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  title: string;
}
export const AppHeader: React.FC<IProps> = ({ title }) => {
  const insets = useSafeAreaInsets();
  return (
    <Box pt={insets.top} direction='row' middle gap={8} between ph={16}>
      <Button onPress={goBack}>
        <ArrowLeftIcon />
      </Button>
      <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
        {title}
      </TextField>
      <Box w={24} />
    </Box>
  );
};
