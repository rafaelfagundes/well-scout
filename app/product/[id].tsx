import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Product({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${id}.json?fields=product_name,brands,image_front_url,nutriscore_grade,nutriscore_score,ecoscore_grade,ecoscore_score`);
        const data = await response.json();
        setProduct(data);
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
  
  if (!product) return (
    <View>
      <Text>Loading...</Text>
    </View>
  );

  return (
    <View>
      <Text>Product: {product.product?.product_name || 'No name'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({})
