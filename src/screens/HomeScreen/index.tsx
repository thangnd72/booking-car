import { SearchIcon } from '@/assets/icons';
import { Box, Button, Carousel, FloatActionButton, TextField } from '@/components';
import theme from '@/helpers/theme';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Category, General, Header } from './components';
import useAuth from '@/hooks/useAuth';

const HomeScreen = React.memo(() => {
  const insets = useSafeAreaInsets();
  const isAuth = useAuth();
  return (
    <Box flex={1} ph={16} pt={insets.top}>
      <Header />
      <Button
        direction='row'
        middle
        color={theme.colors.lightThreeColor}
        ph={16}
        pv={12}
        borderRadius={10}
      >
        <SearchIcon />
        <TextField mb={3} ml={4} size={14} color={theme.colors.darkTwoColor} mt={2}>
          Tìm kiếm
        </TextField>
      </Button>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Category />
        <General />
        <Carousel
          height={200}
          images={[
            {
              url: 'https://st3.depositphotos.com/1021722/33394/i/450/depositphotos_333943612-stock-photo-beautiful-nature-countryside-landscape-spring.jpg',
              link: '',
            },
            {
              url: 'https://png.pngtree.com/thumb_back/fh260/background/20230527/pngtree-scenic-lake-by-the-trees-and-flowers-image_2686854.jpg',
              link: '',
            },
            {
              url: 'https://png.pngtree.com/background/20230412/original/pngtree-natural-forest-with-beautiful-mountains-and-clear-waters-picture-image_2396850.jpg',
              link: '',
            },
          ]}
          onPressBanner={() => {}}
        />
      </ScrollView>
      {isAuth && <FloatActionButton />}
    </Box>
  );
});
export default HomeScreen;
