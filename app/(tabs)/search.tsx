import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import SearchBar from '@/components/SearchBar';
import ProductItem from '@/features/products/ProductItem';

const SUGGESTIONS = [
  "Lay's Sour Cream and Onion Potato Chips",
  "Hershey's Milk Chocolate Bar",
  "Coca-Cola Classic",
  "Kellogg's Frosted Flakes Cereal",
  "Pringles Original Potato Chips",
  "Skippy Creamy Peanut Butter",
  "M&M's Milk Chocolate Candies",
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async () => {
    if (query.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?action=process&search_simple=1&search_terms=${encodeURIComponent(query)}&json=1`)
      const data = await response.json();
      setResults(data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setQuery((prevQuery) => {
      // Use the functional form of setQuery to ensure we have the latest value
      const newQuery = suggestion;

      // Call searchProducts *after* the state has been updated
      //  We need to do it inside the callback, so it uses the correct, updated value
      setTimeout(() => {
          searchProducts();
      }, 0)

      return newQuery; // Return the new state
    });
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
          {loading ? (
            <ActivityIndicator size="large" style={styles.activityIndicator} />
          ) : query.trim() === "" ? (
            <FlatList
              data={SUGGESTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              contentContainerStyle={styles.listContainer}
            />
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
    flex: 1,
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  resultText: {
    marginBottom: 5,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionText: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  }
});
