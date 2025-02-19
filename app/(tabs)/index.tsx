import { StyleSheet, FlatList, View, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import SearchBar from '@/components/SearchBar';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/state/store';
import { Colors } from '@/constants/Colors';
import { ProductsTabs } from '@/features/products/ProductTabs';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

enum Tabs {
  HISTORY = 'history',
  FAVORITES = 'favorites'
}

export default function ProductsScreen() {
  const history = useSelector((state: RootState) => state.product.history);
  const favorites = useSelector((state: RootState) => state.product.favorites);
  const [activeTab, setActiveTab] = useState(Tabs.HISTORY);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  const searchBarHeight = useSharedValue(showSearch ? 50 : 0);

  useEffect(() => {
    searchBarHeight.value = withTiming(showSearch ? 50 : 0, { duration: 200, easing: Easing.inOut(Easing.ease) });
  }, [showSearch]);

  const animatedSearchBarStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
    opacity: searchBarHeight.value,
  }));

  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
  const selectedData = activeTab === Tabs.HISTORY ? history : favorites;
  const filteredData = selectedData.filter(item =>
    item.productName.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
    item.brandName.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  const extraButton = {
    icon: <MagnifyingGlass size={32} color={Colors[useColorScheme() ?? 'light'].text} />,
    onPress: () => setShowSearch(!showSearch),
  };

  return (
    <BackgroundImage>
      <ScreenContainer scrollView={false} extraButtons={[extraButton]}>
        <Animated.View style={[{ overflow: "hidden" }, animatedSearchBarStyle]}>
          <SearchBar searchText={searchText} onChangeText={setSearchText} />
          <View style={{ height: 10 }} />
        </Animated.View>
        <ProductsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={{ height: 10 }} />
        <FlatList
          data={filteredData}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <ProductItem
              id={item.id}
              ecoScore={item.ecoScore}
              nutriScore={item.nutriScore}
              imageUrl={item.imageUrl}
              brandName={item.brandName}
              productName={item.productName}
              createdDate={item.createdDate}
            />
          )}
          keyExtractor={item => item.id}
        />
      </ScreenContainer>
    </BackgroundImage>
  );
}

