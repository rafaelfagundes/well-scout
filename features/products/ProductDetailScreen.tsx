import { StyleSheet, useColorScheme, View, ScrollView, Text } from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { extractProductInfo, ProductInfo } from './Product';
import { Carrot, Orange, Flask, ShieldWarning, Cube, Factory, Tag } from 'phosphor-react-native';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { capitalizeAll, removeDashes } from '@/lib/text';
import { Fonts } from '@/constants/Fonts';
import ProductHeader from './ProductHeader';

interface ProductDetailsScreen {
  product: ProductInfo;
}

const ProductDetailScreen = ({ product }: ProductDetailsScreen) => {
  const colorScheme = useColorScheme();
  const productInfo = extractProductInfo(product);
  const colors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 16,
    },
    section: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 20,
      borderWidth: 0,
      borderColor: Colors[colorScheme ?? 'light'].text,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      marginBottom: 16,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      fontFamily: Fonts.sansSerif,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8,
      color: Colors[colorScheme ?? 'light'].text,
      textTransform: 'capitalize',
      fontFamily: Fonts.sansSerif,
    },
    ingredientItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].text + '10',
      paddingVertical: 8,
    },
    veganTag: {
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginLeft: 8,
      fontFamily: Fonts.sansSerif,
      fontSize: 12,
      color: colors.vegan,
      backgroundColor: colors.vegan + '1F',
    },
    vegetarianTag: {
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginLeft: 8,
      fontFamily: Fonts.sansSerif,
      fontSize: 12,
      color: colors.vegetarian,
      backgroundColor: colors.vegetarian + '2F',
    },
    nutrimentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].text + '10',
      paddingVertical: 8,
    },
    nutrimentLabel: {
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      textTransform: 'capitalize',
      fontFamily: Fonts.sansSerif,
    },
    nutrimentValue: {
      color: Colors[colorScheme ?? 'light'].text,
      fontFamily: Fonts.sansSerif,
    },
    listItem: {
      marginBottom: 4,
      color: Colors[colorScheme ?? 'light'].text,
      textTransform: 'capitalize',
      fontFamily: Fonts.sansSerif,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].text + '10',
      paddingVertical: 8,
    },
    genericName: {
      fontSize: 16,
      fontStyle: 'italic',
      marginBottom: 16,
      color: Colors[colorScheme ?? 'light'].text,
      textTransform: 'capitalize',
      fontFamily: Fonts.sansSerif,
    },
    text: {
      fontFamily: Fonts.sansSerif,
      color: Colors[colorScheme ?? 'light'].text,
    },
    noBorderNoPadding: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    }
  });

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View entering={FadeInUp.duration(500)}>
            <ProductHeader
              imageUrl={productInfo.image}
              productName={productInfo.productName}
              brandName={productInfo.brand}
              nutriScore={productInfo.nutriscore}
              ecoScore={productInfo.ecoscore}
              genericName={productInfo.genericName}
            />
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(100)}>
            <View style={styles.sectionTitleContainer}>
              <Carrot size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Ingredients</Text>
            </View>
            {productInfo.ingredients.length > 0 ? (
              productInfo.ingredients.map((ing, index) => (
                <View key={index} style={[styles.ingredientItem, index === productInfo.ingredients.length - 1 && { borderBottomWidth: 0, paddingBottom: 4 }]}>
                  <Text style={styles.text}>{capitalizeAll(ing.text)}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {ing.vegan === 'yes' && <Text style={styles.veganTag}>Vegan</Text>}
                    {ing.vegetarian === 'yes' && <Text style={styles.vegetarianTag}>Vegetarian</Text>}
                  </View>
                </View>
              ))
            ) : (
              <Text style={[styles.listItem, styles.noBorderNoPadding]}>No ingredients listed</Text>
            )}
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(200)}>
            <View style={styles.sectionTitleContainer}>
              <Orange size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Nutritional Information (per 100g)</Text>
            </View>
            <View style={styles.nutrimentRow}>
              <Text style={styles.nutrimentLabel}>Fat</Text>
              <Text style={styles.nutrimentValue}>{productInfo.nutriments.fat || 0} g</Text>
            </View>
            <View style={styles.nutrimentRow}>
              <Text style={styles.nutrimentLabel}>Saturated Fat</Text>
              <Text style={styles.nutrimentValue}>{productInfo.nutriments.saturatedFat || 0} g</Text>
            </View>
            <View style={styles.nutrimentRow}>
              <Text style={styles.nutrimentLabel}>Sugars</Text>
              <Text style={styles.nutrimentValue}>{productInfo.nutriments.sugars || 0} g</Text>
            </View>
            <View style={styles.nutrimentRow}>
              <Text style={styles.nutrimentLabel}>Salt</Text>
              <Text style={styles.nutrimentValue}>{productInfo.nutriments.salt || 0} g</Text>
            </View>
            {productInfo.nutriments.energyKj && (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Energy (kJ)</Text>
                <Text style={styles.nutrimentValue}>{productInfo.nutriments.energyKj} kJ</Text>
              </View>
            )}
            {productInfo.nutriments.energyKcal && (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Energy (kcal)</Text>
                <Text style={styles.nutrimentValue}>{productInfo.nutriments.energyKcal} kcal</Text>
              </View>
            )}
            {productInfo.nutriments.carbohydrates && (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Carbohydrates</Text>
                <Text style={styles.nutrimentValue}>{productInfo.nutriments.carbohydrates} g</Text>
              </View>
            )}
            {productInfo.nutriments.proteins && (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Proteins</Text>
                <Text style={styles.nutrimentValue}>{productInfo.nutriments.proteins} g</Text>
              </View>
            )}
            {productInfo.nutriments.fiber && (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Fiber</Text>
                <Text style={styles.nutrimentValue}>{productInfo.nutriments.fiber} g</Text>
              </View>
            )}
            {productInfo.nutriments.sodium && (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Sodium</Text>
                <Text style={styles.nutrimentValue}>{productInfo.nutriments.sodium} g</Text>
              </View>
            )}
            {productInfo.servingSize && (
              <Text style={styles.text}>
                Serving Size: {productInfo.servingSize}
              </Text>
            )}
            {productInfo.quantity && (
              <Text style={styles.text}>
                Quantity: {productInfo.quantity}
              </Text>
            )}
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(300)}>
            <View style={styles.sectionTitleContainer}>
              <Flask size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Additives</Text>
            </View>
            {productInfo.additives.length > 0 ? (
              productInfo.additives.map((additive, index) => (
                <Text key={index} style={[styles.listItem, index === productInfo.additives.length - 1 && styles.noBorderNoPadding]}>{additive}</Text>
              ))
            ) : (
              <Text style={[styles.listItem, styles.noBorderNoPadding]}>No additives listed</Text>
            )}
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(400)}>
            <View style={styles.sectionTitleContainer}>
              <ShieldWarning size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Allergens</Text>
            </View>
            {productInfo.allergens.length > 0 ? (
              productInfo.allergens.map((allergen, index) => (
                <Text key={index} style={[styles.listItem, index === productInfo.allergens.length - 1 && styles.noBorderNoPadding]}>{removeDashes(allergen)}</Text>
              ))
            ) : (
              <Text style={[styles.listItem, styles.noBorderNoPadding]}>No allergens listed</Text>
            )}
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(500)}>
            <View style={styles.sectionTitleContainer}>
              <Cube size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Packaging</Text>
            </View>
            {productInfo.packaging.length > 0 ? (
              productInfo.packaging.map((pack, index) => (
                <Text key={index} style={[styles.listItem, index === productInfo.packaging.length - 1 && styles.noBorderNoPadding]}>{pack}</Text>
              ))
            ) : (
              <Text style={[styles.listItem, styles.noBorderNoPadding]}>No packaging information</Text>
            )}
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(600)}>
            <View style={styles.sectionTitleContainer}>
              <Factory size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Manufacturing Places</Text>
            </View>
            {productInfo.manufacturingPlaces.length > 0 ? (
              productInfo.manufacturingPlaces.map((place, index) => (
                <Text key={index} style={[styles.listItem, index === productInfo.manufacturingPlaces.length - 1 && styles.noBorderNoPadding]}>{place}</Text>
              ))
            ) : (
              <Text style={[styles.listItem, styles.noBorderNoPadding]}>No manufacturing places listed</Text>
            )}
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(700)}>
            <View style={styles.sectionTitleContainer}>
              <Tag size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            {productInfo.categories.length > 0 ? (
              productInfo.categories.map((category, index) => (
                <Text key={index} style={[styles.listItem, index === productInfo.categories.length - 1 && styles.noBorderNoPadding]}>{removeDashes(category)}</Text>
              ))
            ) : (
              <Text style={[styles.listItem, styles.noBorderNoPadding]}>No categories listed</Text>
            )}
          </Animated.View>
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};

export default ProductDetailScreen;
