import { StyleSheet, FlatList, View } from 'react-native';
import { Link } from 'expo-router';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';

const DATA = [
  {
    id: "573489345",
    ecoScore: 'b',
    nutriScore: 'c',
    imageUrl: 'https://images.unsplash.com/photo-1528750596806-ff12e21cda04?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Heinz',
    productName: 'Ketchup',
    createdDate: new Date()
  },
  {
    id: "123456789",
    ecoScore: 'a',
    nutriScore: 'a',
    imageUrl: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Organic Valley',
    productName: 'Milk',
    createdDate: new Date()
  },
  {
    id: "987654321",
    ecoScore: 'c',
    nutriScore: 'b',
    imageUrl: 'https://images.unsplash.com/photo-1621057621391-7ed446a24b41?q=80&w=3214&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Nature Valley',
    productName: 'Granola Bars',
    createdDate: new Date()
  },
  {
    id: "456789123",
    ecoScore: 'd',
    nutriScore: 'd',
    imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Elma Chips',
    productName: 'Potato Chips',
    createdDate: new Date()
  },
  {
    id: "789123456",
    ecoScore: 'b',
    nutriScore: 'a',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Fresh Produce',
    productName: 'Apples',
    createdDate: new Date()
  },
  {
    id: "321654987",
    ecoScore: 'a',
    nutriScore: 'b',
    imageUrl: 'https://images.unsplash.com/photo-1589828910786-1ca6da0c7682?q=80&w=2704&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Green Valley',
    productName: 'Organic Yogurt',
    createdDate: new Date()
  },
  {
    id: "654987321",
    ecoScore: 'c',
    nutriScore: 'c',
    imageUrl: 'https://images.unsplash.com/photo-1624684244440-1130c3b65783?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Crunchy Co',
    productName: 'Peanut Butter',
    createdDate: new Date()
  },
  {
    id: "147258369",
    ecoScore: 'd',
    nutriScore: 'e',
    imageUrl: 'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Sweet Treats',
    productName: 'Chocolate Bar',
    createdDate: new Date()
  },
  {
    id: "258369147",
    ecoScore: 'b',
    nutriScore: 'b',
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Mediterranean Delight',
    productName: 'Olive Oil',
    createdDate: new Date()
  },
  {
    id: "369147258",
    ecoScore: 'a',
    nutriScore: 'a',
    imageUrl: 'https://images.unsplash.com/photo-1591959376511-a48af62889a3?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'Pure Spring',
    productName: 'Mineral Water',
    createdDate: new Date()
  }
];

export default function ProductsScreen() {
  return (
    <BackgroundImage>
      <ScreenContainer scrollView={false}>
        <FlatList
          data={DATA}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Link href={`/product/${item.id}`} asChild>
              <ProductItem
                id={item.id}
                ecoScore={item.ecoScore}
                nutriScore={item.nutriScore}
                imageUrl={item.imageUrl}
                brandName={item.brandName}
                productName={item.productName}
                createdDate={item.createdDate}
              />
            </Link>
          )}
          keyExtractor={item => item.id}
        />

      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
