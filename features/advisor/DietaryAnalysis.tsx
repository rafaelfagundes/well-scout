import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Dimensions,
  Image
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
  SlideInDown,
} from 'react-native-reanimated';
import {
  Warning,
  ArrowRight,
  Star,
  CaretDown,
} from 'phosphor-react-native';
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import AdvisorLogo from '../../components/ui/AdvisorLogo';
import { Product, ProductCard } from './ProductCard';
import { OverallRecommendations, RecommendationsSection } from './RecommendationsSection';


interface DietaryReport {
  reportTitle: string;
  introduction: {
    overview: string;
    disclaimer: string;
  };
  productAnalysis: Product[];
  overallRecommendations: OverallRecommendations;
  conclusion: string;
}

// Main Component
const DietaryAnalysis: React.FC<{ report: DietaryReport, reportDate: Date }> = ({ report, reportDate }) => {
  const colors = Colors[useColorScheme() ?? 'light'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    overview: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.9,
      lineHeight: 20,
      fontFamily: Fonts.sansSerif,
    },
    reportDate: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.9,
      lineHeight: 24,
      fontFamily: Fonts.sansSerif,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
      fontFamily: Fonts.sansSerif,
    },
    conclusion: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.9,
      lineHeight: 20,
      fontFamily: Fonts.sansSerif,
    },
    disclaimer: {
      fontSize: 12,
      lineHeight: 16,
      color: colors.text,
      opacity: 0.8,
      fontStyle: 'italic',
      fontFamily: Fonts.sansSerif,
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: 20 }} />
      <AdvisorLogo size={200} />
      <View style={{ width: '100%', height: 20 }} />
      <Text style={styles.reportDate}>Report generated on {reportDate.toLocaleDateString()} {reportDate.toLocaleTimeString()}</Text>
      <View style={{ width: '100%', height: 10 }} />
      <Text style={styles.overview}>{report.introduction.overview}</Text>
      <View style={{ width: '100%', height: 20 }} />
      <RecommendationsSection recommendations={report.overallRecommendations} />
      <View style={{ width: '100%', height: 8 }} />
      <Text style={styles.sectionTitle}>Product Analysis</Text>
      {report.productAnalysis.map((product, index) => (<View key={product.productName}>
        <ProductCard key={index} product={product} />
        {index !== report.productAnalysis.length - 1 && <View style={{ height: 10 }} />}
      </View>
      ))}
      <View style={{ width: '100%', height: 20 }} />
      <Text style={styles.conclusion}>{report.conclusion}</Text>
      <View style={{ width: '100%', height: 20 }} />
      <Text style={styles.sectionTitle}>Disclaimer</Text>
      <Text style={styles.disclaimer}>{report.introduction.disclaimer}</Text>
      <View style={{ width: '100%', height: 40 }} />
    </View>
  );
};


export default DietaryAnalysis;
