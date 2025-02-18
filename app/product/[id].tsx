import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import ProductDetailScreen from '@/features/products/ProductDetailScreen';

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${id}.json?fields=product_name,brands,image_front_url,nutriscore_grade,nutriscore_score,ecoscore_grade,ecoscore_score`);
        const data = await response.json();
        setProduct(data);
        console.log(data)
      } catch (err) {
        setError('Failed to fetch product');
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return (
    <View>
      <Text>{error}</Text>
    </View>
  );

  if (!product) {
    return <LoadingView />;
  }
  
  if (!product.product) {
    return <NoProductView />;
  }

  return (
    <ProductDetailScreen product={product}></ProductDetailScreen>
  );
}

function LoadingView() {
  return (
    <View style={styles.centered}>
      <Text>Loading...</Text>
    </View>
  );
}

function NoProductView() {
  return (
    <View style={styles.centered}>
      <Text>No product found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
