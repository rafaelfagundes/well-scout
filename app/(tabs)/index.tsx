import { StyleSheet, FlatList, View, TouchableOpacity, Text, useColorScheme, TextInput } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { RootState } from '@/state/store';
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';

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
  
  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
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

type ProductsTabsProps = {
  activeTab: Tabs;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

function ProductsTabs({ activeTab, setActiveTab }: ProductsTabsProps) {
  const colorScheme = useColorScheme();

  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const activeTabColor = Colors[colorScheme ?? 'light'].tint;
  const activeTabTextColor = Colors[colorScheme ?? 'light'].tintConstrast;
  const inactiveTabTextColor = Colors[colorScheme ?? 'light'].text;

  const styles = StyleSheet.create({
    container: {
      backgroundColor,
      padding: 4,
      borderRadius: 20,
      height: 40,
      opacity: 0.85,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 32,
      borderRadius: 25,
    },
    tabText: {
      fontFamily: Fonts.sansSerif,
      fontSize: 14,
      textAlign: 'center',
      fontWeight: '600',
    },
    inactiveTab: {
      backgroundColor: 'transparent',
    },
    inactiveTabText: {
      color: inactiveTabTextColor,
    },
    activeTab: {
      backgroundColor: activeTabColor,
    },
    activeTabText: {
      color: activeTabTextColor,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === Tabs.HISTORY ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(Tabs.HISTORY)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === Tabs.HISTORY ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === Tabs.FAVORITES ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(Tabs.FAVORITES)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === Tabs.FAVORITES ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
