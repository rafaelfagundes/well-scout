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
import Logo from '@/components/ui/Logo';

// Color theme
const ratingColors = {
  light: Colors.light.ratings,
  dark: Colors.dark.ratings,
};

// Interfaces
interface Product {
  productName: string;
  brand: string;
  summary: string;
  nutriScore: string;
  novaGroup: number;
  ecoScore?: string;
  healthConcerns: string;
  recommendations: string[];
}

interface OverallRecommendations {
  recurringIssues: string[];
  healthImprovementStrategies: string[];
}

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

// Score Badge Component
const ScoreBadge: React.FC<{ label: string; score: string | number }> = ({
  label,
  score,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  const getScoreColor = (score: string | number) => {
    if (typeof score === 'string') {
      return ratingColors[theme][score.toLowerCase() as keyof typeof ratingColors.light];
    }
    return score > 3 ? ratingColors[theme].e : ratingColors[theme].a;
  };

  return (
    <View
      style={[
        styles.scoreBadge,
        { backgroundColor: getScoreColor(score) },
      ]}
    >
      <Text style={styles.scoreBadgeLabel}>{label}</Text>
      <Text style={styles.scoreBadgeValue}>
        {typeof score === 'string' ? score.toUpperCase() : score}
      </Text>
    </View>
  );
};

// Recommendations Section Component
const RecommendationsSection: React.FC<{
  recommendations: OverallRecommendations;
}> = ({ recommendations }) => {
  return (
    <View style={styles.recommendationsSection}>
      <Text style={styles.sectionTitle}>Recurring Issues</Text>
      {recommendations.recurringIssues.map((issue, index) => (
        <View key={index} style={styles.issueItem}>
          <Warning size={20} color={ratingColors.light.d} />
          <Text style={styles.issueText}>{issue}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Improvement Strategies</Text>
      {recommendations.healthImprovementStrategies.map((strategy, index) => (
        <View key={index} style={styles.strategyItem}>
          <Star size={20} color={ratingColors.light.a} />
          <Text style={styles.strategyText}>{strategy}</Text>
        </View>
      ))}
    </View>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
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

// Main Component
const DietaryAnalysis: React.FC<{ data: DietaryReport }> = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{data.reportTitle}</Text> */}
      <View style={{ width: '100%', height: 20 }} />
      <AdvisorLogo size={200} />
      <View style={{ width: '100%', height: 20 }} />
      <Text style={styles.overview}>{data.introduction.overview}</Text>
      <RecommendationsSection recommendations={data.overallRecommendations} />

      <Text style={styles.sectionTitle}>Product Analysis</Text>
      {data.productAnalysis.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}

      <Text style={styles.conclusion}>{data.conclusion}</Text>
      <Text style={styles.disclaimer}>{data.introduction.disclaimer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    fontFamily: Fonts.sansSerif,
  },
  overview: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: Fonts.sansSerif,
  },
  recommendationsSection: {
    marginBottom: 32,
  },
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
  scoreContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  scoreBadge: {
    padding: 4,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 40,
  },
  scoreBadgeLabel: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
    fontFamily: Fonts.sansSerif,
  },
  scoreBadgeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: Fonts.sansSerif,
  },
  productDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    overflow: 'hidden',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
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
  issueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  issueText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: Fonts.sansSerif,
  },
  strategyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  strategyText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
