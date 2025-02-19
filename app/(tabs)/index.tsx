import { StyleSheet, FlatList, View, TouchableOpacity, Text, useColorScheme, TextInput } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/state/store';
import { Colors } from '@/constants/Colors';
import { ProductsTabs } from '@/features/products/ProductTabs';

enum Tabs {
  HISTORY = 'history',
  FAVORITES = 'favorites'
}

export default function ProductsScreen() {
  const history = useSelector((state: RootState) => state.product.history);
  const favorites = useSelector((state: RootState) => state.product.favorites);
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState(Tabs.HISTORY);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    searchContainer: {
      backgroundColor: backgroundColor + 'D9',
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginTop: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      color: Colors[colorScheme ?? 'light'].text,
    },
  });
  const selectedData = activeTab === Tabs.HISTORY ? history : favorites;
  const filteredData = selectedData.filter(item =>
    item.productName.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
    item.brandName.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  return (
    <BackgroundImage>
      <ScreenContainer scrollView={false}>
        <ProductsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={styles.searchContainer}>
          <MagnifyingGlass size={24} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
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

