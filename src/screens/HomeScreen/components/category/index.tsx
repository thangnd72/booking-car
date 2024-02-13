import { DashboardIcon, FlowerIcon, PhoneCallIcon } from '@/assets/icons';
import { CATEGORY_COLORS, GENERAL_OPTIONS } from '@/common/constants/common';
import { Box, Button, TextField } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { IProductCategory } from '@/interfaces/product.interface';
import { APP_SCREEN } from '@/navigators/screen-types';
import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  categories: IProductCategory[];
}

export const Category: React.FC<IProps> = ({ categories }) => {
  const _onPressCategory = () => {
    navigate(APP_SCREEN.PRODUCT_BY_CATEGORY);
  };
  return (
    <Box>
      <Box direction='row' middle gap={8} pv={16}>
        <DashboardIcon width={24} height={24} />
        <TextField size={16} color={theme.colors.textColor}>
          Danh mục
        </TextField>
      </Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {categories &&
          categories.map((item, index) => (
            <Button
              key={index}
              direction='row'
              middle
              ph={16}
              color={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
              borderRadius={20}
              onPress={_onPressCategory}
            >
              <FlowerIcon width={20} height={20} />
              <TextField
                color={theme.colors.lightSixColor}
                size={14}
                mv={12}
                centered
                ml={6}
                fontFamily={theme.fonts.medium}
              >
                {item.name}
              </TextField>
            </Button>
          ))}
      </ScrollView>
    </Box>
  );
};
