import { StyleSheet, View } from 'react-native';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { CategoryTabs, Tabs } from '@/features/overview/CategoryTabs';
import { useState } from 'react';
import RatingBar from '@/components/ui/RatingBar';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import ProductListByRating from '@/features/overview/ProductListByRating';
import { ProductItem } from '@/features/products/productSlice';
import ProductList from '@/features/overview/ProductList';

function filterProducts(products: any[], activeTab: Tabs) {
  switch (activeTab) {
    case Tabs.FOOD:
      return products.filter(product => product.productType === 'food');
    case Tabs.BEAUTY:
      return products.filter(product => product.productType === 'beauty');
    case Tabs.PETS:
      return products.filter(product => product.productType === 'pet');
    default:
      return products;
  }
}

function getProductsByRating(products: ProductItem[], rating: string) {
  return products.filter(product => product.nutriScore === rating);
}

export default function OverviewScreen() {
  const [activeTab, setActiveTab] = useState(Tabs.FOOD);
  const products = useSelector((state: RootState) => state.product.history);

  const filteredProducts = filterProducts(products, activeTab);

  const productsByRatingA = getProductsByRating(filteredProducts, 'a');
  const productsByRatingB = getProductsByRating(filteredProducts, 'b');
  const productsByRatingC = getProductsByRating(filteredProducts, 'c');
  const productsByRatingD = getProductsByRating(filteredProducts, 'd');
  const productsByRatingE = getProductsByRating(filteredProducts, 'e');

  const ratings = {
    a: productsByRatingA.length,
    b: productsByRatingB.length,
    c: productsByRatingC.length,
    d: productsByRatingD.length,
    e: productsByRatingE.length,
  };

  const productsByRating = {
    e: productsByRatingE,
    d: productsByRatingD,
    c: productsByRatingC,
    b: productsByRatingB,
    a: productsByRatingA,
  };

  return (
    <BackgroundImage>
      <ScreenContainer scrollView={false}>
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={{ height: 10 }} />
        {activeTab === Tabs.FOOD && <RatingBar ratings={ratings} />}
        <View style={{ height: 10 }} />
        {activeTab === Tabs.FOOD && <ProductListByRating productsByRating={productsByRating} />}
        {activeTab !== Tabs.FOOD && <ProductList products={filteredProducts} />}
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
});

