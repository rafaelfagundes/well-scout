import { StyleSheet, View } from 'react-native';

import ScreenContainer from '@/components/ui/ScreenContainer';
import { Text } from 'react-native'
import BackgroundImage from '@/components/ui/BackgroundImage';
import ProductItem from '@/features/products/ProductItem';

export default function ProductsScreen() {
  return (
    <BackgroundImage>
      <ScreenContainer>
        <ProductItem></ProductItem>
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
});
