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
  const colorScheme = useColorScheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` }],
  }));

  const toggleExpand = () => {
    rotation.value = withSpring(expanded ? 0 : 1);
    setExpanded(!expanded);
  };

  // Color theme
  const ratingColors = {
    light: Colors.light.ratings,
    dark: Colors.dark.ratings,
  };


  const styles = StyleSheet.create({
    productCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      overflow: 'hidden',
    },
    productHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    productName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      fontFamily: Fonts.sansSerif,
      maxWidth: Dimensions.get('window').width - 105,
    },
    brandName: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
      fontFamily: Fonts.sansSerif,
    },
    productDetails: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      overflow: 'hidden',
    },
    scoreContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    summary: {
      fontSize: 14,
      color: '#666',
      lineHeight: 22,
      marginBottom: 16,
      fontFamily: Fonts.sansSerif,
    },
    concernsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      backgroundColor: '#fff3f3',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    concernsText: {
      flex: 1,
      fontSize: 14,
      color: ratingColors.light.d,
      lineHeight: 20,
      fontFamily: Fonts.sansSerif,
    },
    recommendationsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
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
      flex: 1,
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
      fontFamily: Fonts.sansSerif,
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
          <CaretDown size={24} color="#666" />
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
          <View style={{ height: 10 }}></View>
          <Text style={styles.summary}>{product.summary}</Text>

          <View style={styles.concernsContainer}>
            <Warning size={24} color={ratingColors.light.d} />
            <Text style={styles.concernsText}>{product.healthConcerns}</Text>
          </View>

          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          {product.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <ArrowRight size={20} color={ratingColors.light.a} />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
};


