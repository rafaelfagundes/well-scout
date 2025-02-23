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
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: 20 }} />
      <AdvisorLogo size={200} />
      <View style={{ width: '100%', height: 20 }} />
      <Text style={styles.reportDate}>Report generated on {reportDate.toLocaleDateString()} {reportDate.toLocaleTimeString()}</Text>
      <Text style={styles.overview}>{report.introduction.overview}</Text>
      <RecommendationsSection recommendations={report.overallRecommendations} />

      <Text style={styles.sectionTitle}>Product Analysis</Text>
      {report.productAnalysis.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}

      <Text style={styles.conclusion}>{report.conclusion}</Text>
      <Text style={styles.disclaimer}>{report.introduction.disclaimer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overview: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: Fonts.sansSerif,
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 24,
    fontFamily: Fonts.sansSerif,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
    fontFamily: Fonts.sansSerif,
  },
  conclusion: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginTop: 24,
    marginBottom: 16,
    fontFamily: Fonts.sansSerif,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 32,
    fontFamily: Fonts.sansSerif,
  },
});

export default DietaryAnalysis;
