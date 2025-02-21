import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { ProductItem as ProductItemType } from '../products/productSlice'
import ProductItem from '../products/ProductItem'

interface ProductListByRatingProps {
  productsByRating: {
    a: ProductItemType[];
    b: ProductItemType[];
    c: ProductItemType[];
    d: ProductItemType[];
    e: ProductItemType[];
  }
}

const ProductListByRating = ({ productsByRating }: ProductListByRatingProps) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const styles = StyleSheet.create({})

  return (
    <View>
      <Text>Product List By Rating</Text>
      {Object.keys(productsByRating).map(rating => (
        <View key={rating}>
          <Text>{rating}</Text>
          <View>
            {productsByRating[rating].map((product: ProductItemType) => (
              <ProductItem key={product.id} imageUrl={product.imageUrl} productName={product.productName} brandName={product.brandName} nutriScore={product.nutriScore} ecoScore={product.ecoScore} id={product.id} touchable={false} />
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}

export default ProductListByRating

