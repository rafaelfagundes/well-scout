import { StyleSheet, Text, useColorScheme, SectionList, View } from 'react-native'
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
  const styles = StyleSheet.create({
    sectionHeaderContainer: {
      backgroundColor: colors.background,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    sectionHeaderText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
  })

  const sections = Object.entries(productsByRating)
    .filter(([rating, data]) => Array.isArray(data) && data.length > 0)
    .map(([rating, data]) => ({
      title: rating,
      data,
    }));

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ProductItemType }) => (
          <ProductItem
            imageUrl={item.imageUrl}
            productName={item.productName}
            brandName={item.brandName}
            nutriScore={item.nutriScore}
            ecoScore={item.ecoScore}
            id={item.id}
            touchable={false}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default ProductListByRating

