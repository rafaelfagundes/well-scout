import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, useColorScheme } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import SearchBar from '@/components/SearchBar';
import ProductItem from '@/features/products/ProductItem';
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';

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
  const colorScheme = useColorScheme();

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
    suggestionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: Fonts.sansSerif,
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 20,
      color: Colors[colorScheme ?? 'light'].text,
    },
    suggestionText: {
      color: Colors[colorScheme ?? 'light'].text,
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      fontFamily: Fonts.sansSerif,
      textAlign: 'center',
      opacity: .85,
    }
  });
  const searchProducts = async (searchTerms?: string) => {
    if (query.trim() === "" && searchTerms === undefined) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?action=process&search_simple=1&search_terms=${searchTerms ? encodeURIComponent(searchTerms) : encodeURIComponent(query)}&json=1`)
      const data = await response.json();
      setResults(data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setQuery(suggestion);
    searchProducts(suggestion);
  };

  return (
    <BackgroundImage>
      <ScreenContainer scrollView={false}>
        <SearchBar
          searchText={query}
          onChangeText={setQuery}
          onSubmitEditing={searchProducts}
        />
        <View style={styles.resultsContainer}>
          {loading ? (
            <ActivityIndicator size="large" style={styles.activityIndicator} />
          ) : query.trim() === "" ? (
            <>
              <Text style={styles.suggestionTitle}>Search Suggestions</Text>
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
            </>
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

