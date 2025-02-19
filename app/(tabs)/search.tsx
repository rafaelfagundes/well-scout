import React, { useState } from 'react';
import { StyleSheet, Button, FlatList, Text } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import SearchBar from '@/components/SearchBar';
import ProductItem from '@/features/products/ProductItem';

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const searchProducts = async () => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(query)}&json=1`);
      const data = await response.json();
      setResults(data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackgroundImage>
      <ScreenContainer>
        <SearchBar searchText={query} onChangeText={setQuery} />
        <Button title="Search" onPress={searchProducts} />
        <FlatList 
          data={results}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <ProductItem 
              id={item.id || item.code || String(item._id)}
              imageUrl={item.image_url || "https://via.placeholder.com/70"}
              productName={item.product_name}
              brandName={item.brands || "Unknown"}
              ecoScore={item.ecoscore || "N/A"}
              nutriScore={item.nutriscore || "N/A"}
              createdDate={item.created_date}
              touchable={false}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={styles.resultsContainer}
        />
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
    marginTop: 10,
  },
  resultText: {
    marginBottom: 5,
  },
});

