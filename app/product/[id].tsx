import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addProductToHistory, ProductItem } from '@/features/products/productSlice';
import ProductDetailScreen from '@/features/products/ProductDetailScreen';
import { extractExtraInformation, extractProductInfo, ExtraInformation, ProductInfo } from '@/features/products/Product';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { EmptyList } from '@/components/ui/EmptyList';
import { ListMagnifyingGlass } from 'phosphor-react-native';
import { NoProductView } from '@/components/ui/NoProductView';

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductInfo>();
  const [error, setError] = useState<string | null>(null);
  const [extraInformation, setExtraInformation] = useState<ExtraInformation>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productResponse, extraResponse] = await Promise.all([
          fetch(`https://world.openfoodfacts.org/api/v3/product/${id}.json?product_type=all`),
          fetch(`https://world.openfoodfacts.org/api/v3/product/${id}?product_type=all&fields=knowledge_panels`)
        ]);

        const productData = await productResponse.json();
        const extraData = await extraResponse.json();

        if (productData.result?.id === "product_not_found") {
          setNotFound(true);
          return;
        }

        console.log(JSON.stringify(productData, null, 2));

        const productInfo: ProductInfo = extractProductInfo(productData);
        const extraInfo: ExtraInformation = extractExtraInformation(extraData);
        setProduct(productInfo);
        setExtraInformation(extraInfo);

        if (productInfo && extraInfo) {
          const product: ProductItem = {
            id: productData.code,
            ecoScore: productData.product.ecoscore_grade,
            nutriScore: productData.product.nutriscore_grade,
            imageUrl: productData.product.image_front_url,
            brandName: productData.product.brands,
            productName: productData.product.product_name,
            category: productData.product.categories_tags ? productData.product.categories_tags.map((category: string) => category.replace('en:', '')) : [],
            productType: productData.product.product_type,
            createdDate: new Date().toISOString(),
            productInfo: productInfo,
            extraInfo: extraInfo
          };
          dispatch(addProductToHistory(product));
        }
      } catch (err) {
        console.log(err)
        setError('Failed to fetch product');
      }
    };
    fetchProduct();
  }, [id]);

  const headerBackTitle = "Back"

  if (notFound) {
    return <>
      <Stack.Screen options={{ title: 'Product Not Found', headerBackTitle }} />
      <NoProductView />
    </>
  }

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

  if (!product) {
    return <>
      <Stack.Screen options={{ title: 'Product Not Found', headerBackTitle }} />
      <NoProductView />
    </>
  }

  return (
    <>
      <Stack.Screen options={{ title: product.productName ?? "Unkown Product", headerBackTitle }} />
      <ProductDetailScreen productInfo={product} extraInfo={extraInformation}></ProductDetailScreen>

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
