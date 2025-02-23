import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Warning, Star } from "phosphor-react-native";
import { View, Text, StyleSheet } from "react-native";



// Interfaces
export interface OverallRecommendations {
  recurringIssues: string[];
  healthImprovementStrategies: string[];
}

// Color theme
const ratingColors = {
  light: Colors.light.ratings,
  dark: Colors.dark.ratings,
};

export const RecommendationsSection: React.FC<{
  recommendations: OverallRecommendations;
}> = ({ recommendations }) => {

  const styles = StyleSheet.create({
    recommendationsSection: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginTop: 16,
      marginBottom: 12,
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
  });



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
