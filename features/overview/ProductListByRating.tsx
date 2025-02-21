import { StyleSheet, Text, useColorScheme, SectionList, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { ProductItem as ProductItemType } from '../products/productSlice'
import ProductItem from '../products/ProductItem'
import { Fonts } from '@/constants/Fonts'

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
      backgroundColor: colors.tint,
      paddingHorizontal: 16,
      height: 24,
      borderRadius: 12,
      marginBottom: 6,
      justifyContent: 'center',
    },
    sectionHeaderText: {
      fontSize: 14,
      color: colors.invertedText,
      fontFamily: Fonts.sansSerif,
    },
  })

  const sections = Object.entries(productsByRating)
    .filter(([rating, data]) => Array.isArray(data) && data.length > 0)
    .map(([rating, data], index) => ({
      title: rating,
      data,
      color: colors.ratings[rating as keyof typeof colors.ratings],
      sectionIndex: index,
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
            hideRating={true}
          />
        )}
        renderSectionHeader={({ section: { title, color, sectionIndex } }) => (
          <View style={{ marginTop: sectionIndex > 0 ? 10 : 0 }}>
            <View style={{ ...styles.sectionHeaderContainer, backgroundColor: color }}>
              <Text style={styles.sectionHeaderText}>{title.toUpperCase()} rating products</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      />
    </View>
  )
}

export default ProductListByRating

