import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import NutriAndEcoScore from './NutriAndEcoScore';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface ProductHeaderProps {
  imageUrl: string;
  productName: string;
  brandName: string;
  genericName?: string;
  nutriScore: string;
  ecoScore: string;
}

export default function ProductHeader({
  imageUrl,
  productName,
  brandName,
  genericName,
  nutriScore,
  ecoScore
}: ProductHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={[styles.image, styles.blurredImage]} resizeMode="cover" blurRadius={20} />
        <Image source={{ uri: imageUrl }} style={[styles.image, styles.foregroundImage]} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.brand, { color: colors.text }]}>{brandName}</Text>
        <Text style={[styles.productName, { color: colors.text }]}>{productName}</Text>
        {genericName ? (
          <Text style={[styles.genericName, { color: colors.text }]}>{genericName}</Text>
        ) : null}
      </View>
      <NutriAndEcoScore nutriScore={nutriScore} ecoScore={ecoScore} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  brand: {
    fontFamily: Fonts.sansSerif,
    fontSize: 16,
  },
  productName: {
    fontFamily: Fonts.sansSerif,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4
  },
  genericName: {
    fontFamily: Fonts.sansSerif,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 2
  },
  imageContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    marginBottom: 16,
  },
  blurredImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
  },
  foregroundImage: {
    width: 200,
    height: 200,
  }
});
