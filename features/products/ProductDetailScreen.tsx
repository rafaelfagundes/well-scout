import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import ProductItem from './ProductItem'
import { Colors } from '@/constants/Colors'

interface ProductDetailsScreen {
  product: any
}

const ProductDetailScreen = ({ product }: ProductDetailsScreen) => {
  const colorScheme = useColorScheme()

  const styles = StyleSheet.create({
    container: {
      padding: 6,
      paddingTop: 16,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      height: '100%'
    }
  })
  return (
    <View style={styles.container}>
      <ProductItem
        imageUrl=''
        createdDate={new Date()}
        productName={product.product_name}
        brandName=''
        nutriScore=''
        ecoScore=''
        id={product.code}
      />
    </View>
  )
}

export default ProductDetailScreen

