import { Box, Button, TextField } from '@/components';
import theme from '@/helpers/theme';
import { TRootState, useAppDispatch } from '@/stores';
import { useRoute } from '@react-navigation/native';
import { debounce, get } from 'lodash';
import React, { useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Header } from './components';
import styles from './styles';
import { ProductList } from './layouts';

interface IParms {
  categoryId: string;
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ProductByCategory = React.memo(() => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const { params } = useRoute();
  const { categoryId } = params as IParms;

  const { productCategories } = useSelector((state: TRootState) => state.product);
  const categoryIndex = productCategories.data.findIndex((category) => category.id === categoryId);
  const initialPage = categoryIndex > -1 ? categoryIndex : 0;

  const pageViewRef = React.useRef<PagerView>(null);
  const headerRef = React.useRef<FlatList>(null);
  const [page, setPage] = React.useState<number>(initialPage);
  const [searchKeyword, setSearchKeyword] = React.useState<string>();

  const changePage = (index: number) => {
    pageViewRef?.current?.setPage(index);
    setPage(index);
  };
  const _onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const position = get(event, 'nativeEvent.position');
    setPage(position);
  };

  const _onChangeCategory = (index: number) => {
    changePage(index);
  };

  const debounceSearch = useCallback(
    debounce(async (keyword?: string) => {
      setSearchKeyword(keyword);
    }, 300),
    [],
  );

  const _onChangeKeyword = (keyword: string) => {
    debounceSearch(keyword);
  };

  React.useEffect(() => {
    headerRef.current?.scrollToIndex({
      index: page,
      animated: true,
      viewPosition: 0.5,
    });
  }, [page]);

  return (
    <Box flex={1} pt={insets.top}>
      <Box ph={16}>
        <Header onChangeText={_onChangeKeyword} />
      </Box>
      <Box>
        <FlatList
          data={productCategories.data}
          horizontal
          ref={headerRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyExtractor={(_, index) => `key-${index}`}
          renderItem={({ item, index }) => {
            const isSelected = page === index;
            return (
              <Box middle>
                <Button ph={16} pv={6} h={33} onPress={() => _onChangeCategory(index)}>
                  <TextField
                    fontFamily={isSelected ? theme.fonts.medium : theme.fonts.regular}
                    color={isSelected ? theme.colors.primary : theme.colors.textColor}
                    size={16}
                  >
                    {item.name}
                  </TextField>
                </Button>
                {isSelected && <Box w={item.name.length * 5} h={1} color={theme.colors.primary} />}
              </Box>
            );
          }}
          onScrollToIndexFailed={() => {}}
        />
      </Box>
      <AnimatedPagerView
        ref={pageViewRef}
        style={styles.pagerView}
        initialPage={initialPage}
        onPageSelected={_onPageSelected}
      >
        {productCategories.data.map((category, index) => (
          <Box key={`${index}`} flex={1}>
            {page === index && <ProductList categoryId={category.id} keyword={searchKeyword} />}
          </Box>
        ))}
      </AnimatedPagerView>
    </Box>
  );
});

export default ProductByCategory;
