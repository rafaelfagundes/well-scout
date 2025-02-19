import { StyleSheet, FlatList, View, TouchableOpacity, Text } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { RootState } from '@/state/store';
import { Fonts } from '@/constants/Fonts';

enum Tabs {
  HISTORY = 'history',
  FAVORITES = 'favorites'
}

export default function ProductsScreen() {
  const history = useSelector((state: RootState) => state.product.history);
  const favorites = useSelector((state: RootState) => state.product.favorites);
  const [activeTab, setActiveTab] = useState(Tabs.HISTORY);

  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

  return (
    <BackgroundImage>
      <ScreenContainer scrollView={false}>
        <ProductsTabs activeTab={activeTab} setActiveTab={setActiveTab}></ProductsTabs>
        <FlatList
          data={activeTab === Tabs.HISTORY ? history : favorites}
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
  const styles = StyleSheet.create({
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    tab: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#F2F2F2'
    },
    tabText: {
      fontFamily: Fonts.sansSerif,
      fontWeight: 700,
      fontSize: 14,
      color: '#000'
    },
    activeTab: {
      backgroundColor: '#ccc'
    }
  })
  return (
    <View style={styles.tabs}>
      <TouchableOpacity style={[styles.tab, activeTab === Tabs.HISTORY && styles.activeTab]} onPress={() => setActiveTab(Tabs.HISTORY)}>
        <Text style={styles.tabText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, activeTab === Tabs.FAVORITES && styles.activeTab]} onPress={() => setActiveTab(Tabs.FAVORITES)}>
        <Text style={styles.tabText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  )
}
