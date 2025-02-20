import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import SearchBar from '@/components/SearchBar';
import ProductItem from '@/features/products/ProductItem';

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const searchProducts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?action=process&search_simple=1&search_terms=${encodeURIComponent(query)}&json=1`)
      const data = await response.json();
      setResults(data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading in both try and catch
    }
  };

  return (
    <BackgroundImage>
      <ScreenContainer scrollView={false}>
        <SearchBar
          searchText={query}
          onChangeText={setQuery}
          onSubmitEditing={searchProducts}
          returnKeyType="search"
        />
        <View style={styles.resultsContainer}>
          {loading ? ( // Conditionally render ActivityIndicator or FlatList
            <ActivityIndicator size="large" style={styles.activityIndicator} />
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <ProductItem
                  id={item.id || item.code || String(item._id)}
                  imageUrl={item.image_front_url || item.image_url || "https://via.placeholder.com/70"}
                  productName={item.abbreviated_product_name || item.product_name_en || item.product_name}
                  brandName={item.brands || "Unknown"}
                  ecoScore={item.ecoscore_grade || "N/A"}
                  nutriScore={item.nutriscore_grade || "N/A"}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  resultsContainer: {
    flex: 1, // Add flex: 1 to allow the content to fill the screen
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 10, // Add padding to the bottom of the list
  },
  resultText: {
    marginBottom: 5,
  },
  activityIndicator: { // Added style for centering
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
