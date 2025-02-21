import React from 'react'
import { View, FlatList } from 'react-native'
import ProductItem from '../products/ProductItem'
import { ProductItem as ProductItemType } from '../products/productSlice'

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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      />
    </View>
  )
}

export default ProductList
