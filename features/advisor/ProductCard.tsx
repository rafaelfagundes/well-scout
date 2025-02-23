import { Fonts } from "@/constants/Fonts";
import { CaretDown, Warning, ArrowRight } from "phosphor-react-native";
import React, { useState } from "react";
import { Text, StyleSheet, useColorScheme, TouchableOpacity, View, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withSpring, FadeIn, SlideInDown, FadeOut } from "react-native-reanimated";
import { ScoreBadge } from "./ScoreBadge";
import { Colors } from "@/constants/Colors";

// Interfaces
export interface Product {
  productName: string;
  brand: string;
  summary: string;
  nutriScore: string;
  novaGroup: number;
  ecoScore?: string;
  healthConcerns: string;
  recommendations: string[];
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const rotation = useSharedValue(0);
  const colors = Colors[useColorScheme() ?? 'light'];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` }],
  }));

  const toggleExpand = () => {
    rotation.value = withSpring(expanded ? 0 : 1);
    setExpanded(!expanded);
  };


  const styles = StyleSheet.create({
    productCard: {
      backgroundColor: colors.background,
      borderRadius: 12,
      elevation: 3,
      overflow: 'hidden',
    },
    productHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    productName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      fontFamily: Fonts.sansSerif,
      maxWidth: Dimensions.get('window').width - 105,
    },
    brandName: {
      fontSize: 12,
      color: colors.text,
      marginTop: 4,
      fontFamily: Fonts.sansSerif,
      opacity: 0.8,
    },
    productDetails: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.text + '11',
      overflow: 'hidden',
    },
    scoreContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    summary: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
      fontFamily: Fonts.sansSerif,
      lineHeight: 20
    },
    concernsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      borderWidth: 1,
      borderColor: colors.ratings.d + '44',
      backgroundColor: colors.ratings.d + '10',
      padding: 12,
      paddingRight: 20,
      borderRadius: 16,
    },
    concernsText: {
      flex: 1,
      fontSize: 14,
      color: colors.ratings.d,
      lineHeight: 20,
      fontFamily: Fonts.sansSerif,
    },
    recommendationsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      opacity: 0.9,
      marginBottom: 12,
      fontFamily: Fonts.sansSerif,
    },
    recommendationItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 8,
    },
    recommendationText: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
      lineHeight: 20,
      fontFamily: Fonts.sansSerif,
      paddingRight: 30,
    },
  });

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      style={styles.productCard}
    >
      <TouchableOpacity onPress={toggleExpand} style={styles.productHeader}>
        <View>
          <Text style={styles.productName} numberOfLines={1} >{product.productName}</Text>
          <Text style={styles.brandName}>{product.brand}</Text>
        </View>
        <Animated.View style={animatedStyle}>
          <CaretDown size={18} color={colors.text} />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <Animated.View
          entering={SlideInDown.duration(300)}
          exiting={FadeOut.duration(200)}
          style={styles.productDetails}
        >
          <View style={styles.scoreContainer}>
            <ScoreBadge label="Nutri" score={product.nutriScore} />
            <ScoreBadge label="Nova" score={product.novaGroup} />
            {product.ecoScore && (
              <ScoreBadge label="Eco" score={product.ecoScore} />
            )}
          </View>
          <View style={{ height: 16 }}></View>
          <Text style={styles.summary}>{product.summary}</Text>

          <View style={{ height: 16 }}></View>
          <View style={styles.concernsContainer}>
            <Warning size={24} color={colors.ratings.d} />
            <Text style={styles.concernsText}>{product.healthConcerns}</Text>
          </View>
          <View style={{ height: 16 }}></View>

          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          {product.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <ArrowRight size={20} color={colors.ratings.a} />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
};


