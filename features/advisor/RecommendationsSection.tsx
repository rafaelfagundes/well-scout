import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Warning, Star } from "phosphor-react-native";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

export interface OverallRecommendations {
  recurringIssues: string[];
  healthImprovementStrategies: string[];
}

export const RecommendationsSection: React.FC<{
  recommendations: OverallRecommendations;
}> = ({ recommendations }) => {
  const colors = Colors[useColorScheme() ?? 'light'];

  const styles = StyleSheet.create({
    recommendationsSection: {
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
      fontFamily: Fonts.sansSerif,
    },
    issueItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 8,
    },
    issueText: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
      opacity: 0.9,
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
      color: colors.text,
      opacity: 0.9,
      lineHeight: 20,
      fontFamily: Fonts.sansSerif,
    },
  });

  return (
    <View style={styles.recommendationsSection}>
      <Text style={styles.sectionTitle}>Recurring Issues</Text>
      {recommendations.recurringIssues.map((issue, index) => (
        <View key={index} style={styles.issueItem}>
          <Warning size={20} color={colors.warning} weight="fill" />
          <Text style={styles.issueText}>{issue}</Text>
        </View>
      ))}
      <View style={{ height: 4 }}></View>
      <Text style={styles.sectionTitle}>Improvement Strategies</Text>
      {recommendations.healthImprovementStrategies.map((strategy, index) => (
        <View key={index} style={styles.strategyItem}>
          <Star size={20} color={colors.success} weight="fill" />
          <Text style={styles.strategyText}>{strategy}</Text>
        </View>
      ))}
    </View>
  );
};
