import { DashboardIcon, FlowerIcon, PhoneCallIcon } from '@/assets/icons';
import { GENERAL_OPTIONS } from '@/common/constants/common';
import { Box, TextField } from '@/components';
import theme from '@/helpers/theme';
import { ScrollView } from 'react-native-gesture-handler';

export const Category: React.FC = () => {
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
        {GENERAL_OPTIONS.map((item, index) => (
          <Box key={index} direction='row' middle ph={16} color={item.color} borderRadius={20}>
            <FlowerIcon width={20} height={20} />
            <TextField
              color={theme.colors.lightSixColor}
              size={14}
              mv={12}
              centered
              ml={6}
              fontFamily={theme.fonts.medium}
            >
              {item.label}
            </TextField>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};
