import { ArrowLeftIcon, CartIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import { Box, Button } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { TextInput } from 'react-native';
import styles from './styles';

interface IProps {
  onChangeText: (keyword: string) => void;
}

export const Header: React.FC<IProps> = ({ onChangeText }) => {
  return (
    <Box direction='row' middle gap={8}>
      <Button onPress={goBack}>
        <ArrowLeftIcon />
      </Button>
      <Box
        borderRadius={24}
        border
        borderColor={theme.colors.darkFiveColor}
        flex={1}
        ph={16}
        h={45}
        middle
        direction='row'
      >
        <SearchIcon width={20} />
        <TextInput
          style={styles.searchInput}
          placeholder='Tìm kiếm sản phẩm'
          placeholderTextColor={theme.colors.darkTwoColor}
          onChangeText={onChangeText}
        />
      </Box>
      <Box direction='row' gap={12}>
        <Button>
          <CartIcon width={24} />
        </Button>
        <Button>
          <FilterIcon width={24} />
        </Button>
      </Box>
    </Box>
  );
};
