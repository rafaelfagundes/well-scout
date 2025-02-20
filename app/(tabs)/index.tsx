import { StyleSheet, FlatList, View, Text, useColorScheme } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import SearchBar from '@/components/SearchBar';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { RootState } from '@/state/store';
import { Colors } from '@/constants/Colors';
import { ProductsTabs } from '@/features/products/ProductTabs';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/state/store';
import { removeProductFromHistory, addProductToFavorites, initializeProductState, removeProductFromFavorites } from '@/features/products/productSlice'; // Import initializeProductState
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

enum Tabs {
  HISTORY = 'history',
  FAVORITES = 'favorites'
}

function SwipeableListItem({ item, activeTab, dispatch, styles }: { item: any; activeTab: Tabs; dispatch: any; styles: any; }) {
  const swipeableRef = useRef(null);
  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderLeftActions={() => (
        <View style={styles.removeItem}>
          <Text style={styles.removeItemText}>Delete</Text>
        </View>
      )}
      renderRightActions={() => (
        <View style={styles.addRemoveItemFromFavorites}>
          <Text style={styles.addRemoveItemFromFavoritesText}>
            {activeTab === Tabs.FAVORITES ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </View>
      )}
      onSwipeableOpen={(direction) => {
        if (direction === 'left') {
          dispatch(removeProductFromHistory(item));
        } else if (direction === 'right') {
          if (activeTab === Tabs.HISTORY) {
            dispatch(addProductToFavorites(item));
          } else {
            dispatch(removeProductFromFavorites(item));
          }
        }
        swipeableRef.current?.reset();
      }}
    >
      <ProductItem
        id={item.id}
        ecoScore={item.ecoScore}
        nutriScore={item.nutriScore}
        imageUrl={item.imageUrl}
        brandName={item.brandName}
        productName={item.productName}
        createdDate={item.createdDate}
      />
    </ReanimatedSwipeable>
  );
}

export default function ProductsScreen() {
  const history = useSelector((state: RootState) => state.product.history);
  const favorites = useSelector((state: RootState) => state.product.favorites);
  const [activeTab, setActiveTab] = useState(Tabs.HISTORY);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchBarHeight = useSharedValue(showSearch ? 50 : 0);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeProductState());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);


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
    removeItem: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      flex: 1,
      backgroundColor: 'red',
      paddingLeft: 20,
      borderRadius: 20
    },
    removeItemText: {
      color: 'white'
    },
    addRemoveItemFromFavorites: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      flex: 1,
      backgroundColor: activeTab === Tabs.FAVORITES ? 'orange' : '#4CAF50',
      paddingRight: 20,
      borderRadius: 20
    },
    addRemoveItemFromFavoritesText: {
      maxWidth: 80,
      color: 'white',
      textAlign: 'center'
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              <SwipeableListItem item={item} activeTab={activeTab} dispatch={dispatch} styles={styles} />
            )}
            keyExtractor={item => item.id}
          />
        </ScreenContainer>
      </BackgroundImage>
    </GestureHandlerRootView>
  );
}
