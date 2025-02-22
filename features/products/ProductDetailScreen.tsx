import { StyleSheet, useColorScheme, View, ScrollView, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeIn, FadeInUp, FadeOut, SlideInDown, SlideOutDown, Layout, SlideInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { extractExtraInformation, extractProductInfo } from './Product';
import { Carrot, Orange, Flask, ShieldWarning, Package, Factory, Tag, Info } from 'phosphor-react-native';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { capitalizeAll, removeDashes } from '@/lib/text';
import { Fonts } from '@/constants/Fonts';
import ProductHeader from './ProductHeader';

interface ProductDetailsScreen {
  product: any;
  extraInformation: any;
}

const ProductDetailScreen = ({ product, extraInformation }: ProductDetailsScreen) => {
  console.log("barcode", product.code)
  const colorScheme = useColorScheme();
  const productInfo = extractProductInfo(product);
  const extraInfo = extractExtraInformation(extraInformation);
  console.log(extraInfo)
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
              <Text style={styles.nutrimentValue}>{(productInfo.nutriments.fat || 0) + " g"}</Text>
            </View>
            <View style={styles.nutrimentRow}>
              <Text style={styles.nutrimentLabel}>Saturated Fat</Text>
              <Text style={styles.nutrimentValue}>{(productInfo.nutriments.saturatedFat || 0) + " g"}</Text>
            </View>
            <View style={styles.nutrimentRow}>
              <Text style={styles.nutrimentLabel}>Sugars</Text>
              <Text style={styles.nutrimentValue}>{(productInfo.nutriments.sugars || 0) + " g"}</Text>
            </View>
            {productInfo.nutriments.energyKj ? (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Energy (kJ)</Text>
                <Text style={styles.nutrimentValue}>{(productInfo.nutriments.energyKj || 0) + " kJ"}</Text>
              </View>
            ) : null}
            {productInfo.nutriments.energyKcal ? (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Energy (kcal)</Text>
                <Text style={styles.nutrimentValue}>{(productInfo.nutriments.energyKcal || 0) + " kcal"}</Text>
              </View>
            ) : null}
            {productInfo.nutriments.carbohydrates ? (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Carbohydrates</Text>
                <Text style={styles.nutrimentValue}>{(productInfo.nutriments.carbohydrates || 0) + " g"}</Text>
              </View>
            ) : null}
            {productInfo.nutriments.proteins ? (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Proteins</Text>
                <Text style={styles.nutrimentValue}>{(productInfo.nutriments.proteins || 0) + " g"}</Text>
              </View>
            ) : null}
            {productInfo.nutriments.fiber ? (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Fiber</Text>
                <Text style={styles.nutrimentValue}>{(productInfo.nutriments.fiber || 0) + " g"}</Text>
              </View>
            ) : null}
            {productInfo.nutriments.sodium && (
              <View style={styles.nutrimentRow}>
                <Text style={styles.nutrimentLabel}>Sodium</Text>
                <Text style={styles.nutrimentValue}>{(productInfo.nutriments.sodium || 0) + " g"}</Text>
              </View>
            )}
            {productInfo.servingSize && (
              <Text style={styles.text}>
                Serving Size: {productInfo.servingSize || "0"}
              </Text>
            )}
            {productInfo.quantity && (
              <Text style={styles.text}>
                Quantity: {productInfo.quantity || "0"}
              </Text>
            )}
          </Animated.View>
          <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(300)}>
            <View style={styles.sectionTitleContainer}>
              <Flask size={24} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.sectionTitle}>Additives</Text>
            </View>
            {extraInfo.health.additives.length > 0 ? (
              extraInfo.health.additives.map((additive, index) => (
                <AdditiveItem key={index} additive={additive} isLast={index === extraInfo.health.additives.length - 1} />
              ))
            ) : (
              <Text style={[styles.additiveItem, styles.noBorderNoPadding]}>No additives listed</Text>
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
              <Package size={24} color={Colors[colorScheme ?? 'light'].text} />
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

function AdditiveItem({ additive, isLast = false }: { additive: any, isLast?: boolean }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isExpanded, setIsExpanded] = useState(false);

  const styles = StyleSheet.create({
    additiveItem: {
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: colors.text + '10',
      paddingVertical: 8,
      overflow: 'hidden',
    },
    text: {
      color: colors.text,
      textTransform: 'capitalize',
      fontFamily: Fonts.sansSerif,
    },
    information: {
      fontSize: 12,
      color: colors.text,
      opacity: .75,
      marginTop: 4,
      lineHeight: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });

  function formatText(text: string) {
    // remove HTML tags
    const regex = /(<([^>]+)>)/ig;
    const cleanedText = text?.replace(regex, '');
    return cleanedText;
  }

  return (
    <View style={styles.additiveItem}>
      <View style={styles.row}>
        <Text style={styles.text}>{additive.name}</Text>
        {additive.information ? <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <Info size={22} color={colors.vegetarian} />
        </Pressable> : null}
      </View>
      {isExpanded && (
      <Animated.View
        entering={SlideInUp.duration(300)}
        exiting={SlideOutDown.duration(300)}
      >
        <Text style={[styles.text, styles.information]}>{formatText(additive.information)}</Text>
      </Animated.View>
      )}
    </View>
  )
}
