import { StyleSheet, FlatList, View, Text, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowCounterClockwise, Barcode, Clock, HeartBreak, MagnifyingGlass } from 'phosphor-react-native';
import SearchBar from '@/components/ui/SearchBar';
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
import { removeProductFromHistory, addProductToFavorites, initializeProductState, removeProductFromFavorites } from '@/features/products/productSlice';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EmptyList, EmptyListButton } from '@/components/ui/EmptyList';
import { initializePreferencesState } from '@/features/preferences/preferencesSlice';

enum Tabs {
  HISTORY = 'history',
  FAVORITES = 'favorites'
}

function SwipeableListItem({ item, activeTab, dispatch }: { item: any; activeTab: Tabs; dispatch: any; }) {
  const swipeableRef = useRef(null);

  const styles = StyleSheet.create({
    removeItem: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      flex: 1,
      backgroundColor: 'red',
      paddingRight: 20,
      borderRadius: 20
    },
    removeItemText: {
      color: 'white',
      maxWidth: 80,
      textAlign: 'center'
    },
    addRemoveItemFromFavorites: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      flex: 1,
      backgroundColor: '#4CAF50',
      paddingLeft: 20,
      borderRadius: 20
    },
    addRemoveItemFromFavoritesText: {
      maxWidth: 80,
      color: 'white',
      textAlign: 'center'
    },
  });

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <View style={styles.removeItem}>
          <Text style={styles.removeItemText}>{`Delete${activeTab === Tabs.HISTORY ? ' from History' : ' from Favorites'}`}</Text>
        </View>
      )}
      renderLeftActions={activeTab === Tabs.HISTORY ? () => (
        <View style={styles.addRemoveItemFromFavorites}>
          <Text style={styles.addRemoveItemFromFavoritesText}>
            Add to Favorites
          </Text>
        </View>
      ) : undefined}
      onSwipeableOpen={(direction) => {
        if (direction === 'right') {
          if (activeTab === Tabs.HISTORY) {
            dispatch(removeProductFromHistory(item));
          }
          else {
            dispatch(removeProductFromFavorites(item));
          }
        } else if (direction === 'left') {
          dispatch(addProductToFavorites(item));
        }
        (swipeableRef.current as any).reset();
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
  const colors = Colors[useColorScheme() ?? 'light'];

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(initializeProductState());
    dispatch(initializePreferencesState());
    // uncomment to reset state
    // dispatch(resetStorage());
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
  });

  const selectedData = activeTab === Tabs.HISTORY ? history : favorites;

  const filteredData = selectedData.filter(item =>
    item.productName.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
    item.brandName.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  const extraToolbarButton = {
    icon: <MagnifyingGlass size={32} color={colors.text} />,
    onPress: () => setShowSearch(!showSearch),
  };

  const emptyActionButtonsHistory: EmptyListButton[] = [
    {
      icon: <Barcode size={32} color={colors.text} />,
      onPress: () => router.push('/(tabs)/scan'),
      text: 'Scan Product'
    },
    {
      icon: <MagnifyingGlass size={32} color={colors.text} />,
      onPress: () => router.push('/(tabs)/search'),
      text: 'Search Items'
    }
  ];

  const historyEmptyIcon = <ArrowCounterClockwise size={64} color={colors.text} />;

  const emptyActionButtonsFavorites: EmptyListButton[] = [
    {
      icon: <Clock size={32} color={colors.text} />,
      onPress: () => setActiveTab(Tabs.HISTORY),
      text: 'Go to history'
    }
  ];

  const favoriteEmptyIcon = <HeartBreak size={64} color={colors.text} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BackgroundImage>
        <ScreenContainer scrollView={false} extraButtons={[extraToolbarButton]}>
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
              <SwipeableListItem item={item} activeTab={activeTab} dispatch={dispatch} />
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              activeTab === Tabs.HISTORY ? <EmptyList marginTop={40} icon={historyEmptyIcon} title='No items in history' text='Scan a product or search for a specific item.' buttons={emptyActionButtonsHistory} />
                : <EmptyList marginTop={40} icon={favoriteEmptyIcon} title='No favorites' text='Go to history and add some favorite items.' buttons={emptyActionButtonsFavorites} />
            }
          />
        </ScreenContainer>
      </BackgroundImage>
    </GestureHandlerRootView>
  );
}
