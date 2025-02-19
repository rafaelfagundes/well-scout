import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, ScrollView, Text } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';

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
        <TextInput 
          style={styles.input}
          placeholder="Search for products by name or category"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Search" onPress={searchProducts} />
        <ScrollView style={styles.resultsContainer}>
          {results.map((item, index) => (
            <Text key={index} style={styles.resultText}>
              {item.product_name} - {item.categories}
            </Text>
          ))}
        </ScrollView>
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

