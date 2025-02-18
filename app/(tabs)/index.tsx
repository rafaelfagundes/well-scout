import { StyleSheet, View } from 'react-native';

import ScreenContainer from '@/components/ui/ScreenContainer';
import { Text } from 'react-native'
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';

export default function ProductsScreen() {
  return (
    <BackgroundImage>
      <ScreenContainer>
        <ProductItem
          id={"573489345"}
          ecoScore='b'
          nutriScore='c'
          imageUrl='https://images.unsplash.com/photo-1528750596806-ff12e21cda04?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          brandName='Heinz'
          productName='Ketchup'
          createdDate={new Date()}
        ></ProductItem>
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
});
