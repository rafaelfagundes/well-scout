import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Text, useColorScheme, View, StyleSheet } from "react-native";

export const ScoreBadge: React.FC<{ label: string; score: string | number }> = ({
  label,
  score,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  const styles = StyleSheet.create({
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
  });

  // Color theme
  const ratingColors = {
    light: Colors.light.ratings,
    dark: Colors.dark.ratings,
  };


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


