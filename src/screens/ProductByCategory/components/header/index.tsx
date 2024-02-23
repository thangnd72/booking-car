import { ArrowLeftIcon, CartIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import { Box, Button } from '@/components';
import { goBack, navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { TextInput } from 'react-native';
import styles from './styles';
import { APP_SCREEN } from '@/navigators/screen-types';

interface IProps {
  onChangeText: (keyword: string) => void;
}

export const Header: React.FC<IProps> = ({ onChangeText }) => {
  const _onNavigateCart = () => {
    navigate(APP_SCREEN.SHOPPING_CART);
  };

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
        <Button onPress={_onNavigateCart}>
          <CartIcon width={24} />
        </Button>
        {/* <Button>
          <FilterIcon width={24} />
        </Button> */}
      </Box>
    </Box>
  );
};
