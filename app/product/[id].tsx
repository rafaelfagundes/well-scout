import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addProductToHistory } from '@/features/products/productSlice';
import ProductDetailScreen from '@/features/products/ProductDetailScreen';

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [extraInformation, setExtraInformation] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productResponse, extraResponse] = await Promise.all([
          fetch(`https://world.openfoodfacts.org/api/v3/product/${id}.json?product_type=all`),
          fetch(`https://world.openfoodfacts.org/api/v3/product/${id}?product_type=all&fields=knowledge_panels`)
        ]);
        const productData = await productResponse.json();
        const extraData = await extraResponse.json();
        setProduct(productData);
        setExtraInformation(extraData);
        if (productData.product) {
          dispatch(addProductToHistory({
            imageUrl: productData.product.image_front_url,
            productName: productData.product.product_name,
            brandName: productData.product.brands,
            nutriScore: productData.product.nutriscore_grade,
            ecoScore: productData.product.ecoscore_grade,
            id: productData.code,
            productType: productData.product.product_type,
            createdDate: new Date().toISOString()
          }));
        }
      } catch (err) {
        setError('Failed to fetch product');
      }
    };
    fetchProduct();
  }, [id]);

  const headerBackTitle = "Back"

  if (error) {
    return <>
      <Stack.Screen options={{ title: 'Error', headerBackTitle }} />
      <View>
        <Text>{error}</Text>
      </View>
    </>
  }

  if (!product || !extraInformation) {
    return <>
      <Stack.Screen options={{ title: 'Loading...', headerBackTitle }} />
      <LoadingView />
    </>
  }

  if (!product.product) {
    return <>
      <Stack.Screen options={{ title: 'Product Not Found', headerBackTitle }} />
      <NoProductView />
    </>
  }

  return (
    <>
      <Stack.Screen options={{ title: product.product?.product_name ?? "Unkown Product", headerBackTitle }} />
      <ProductDetailScreen product={product} extraInformation={extraInformation}></ProductDetailScreen>
    </>
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
