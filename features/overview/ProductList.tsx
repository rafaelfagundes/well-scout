import React from 'react'
import { View, FlatList, useColorScheme } from 'react-native'
import ProductItem from '../products/ProductItem'
import { ProductItem as ProductItemType } from '../products/productSlice'
import { EmptyList } from '@/components/ui/EmptyList'
import { Barcode, MagnifyingGlass } from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

interface ProductListProps {
  products: ProductItemType[]
}

const ProductList = ({ products }: ProductListProps) => {
  const renderItem = ({ item }: { item: ProductItemType }) => (
    <ProductItem
      imageUrl={item.imageUrl}
      productName={item.productName}
      brandName={item.brandName}
      nutriScore={item.nutriScore}
      ecoScore={item.ecoScore}
      id={item.id}
      hideRating={true}
    />
  )

  const router = useRouter()
  const emptyActionButtons = [
    {
      icon: <Barcode size={32} color={Colors[useColorScheme() ?? 'light'].text} />,
      onPress: () => router.push('/(tabs)/scan'),
      text: 'Scan Product'
    },
    {
      icon: <MagnifyingGlass size={32} color={Colors[useColorScheme() ?? 'light'].text} />,
      onPress: () => router.push('/(tabs)/search'),
      text: 'Search Items'
    }
  ]

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        ListEmptyComponent={<EmptyList title="No products" text="There are no products available to generate an overview." buttons={emptyActionButtons} />}
      />
    </View>
  )
}

export default ProductList
