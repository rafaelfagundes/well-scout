import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';

// Screen width minus padding
const SCREEN_WIDTH = Dimensions.get('window').width - 32;

interface RatingBarProps {
  ratings: { [key: string]: number };
}

function getRandomPhrase(score: number): string {
  // Define phrases for each score range
  const phrases: { [key: string]: string[] } = {
    '0-20': [
      "A red flag for your health—time to rethink your choices.",
      "Your products are a health hazard. Let's make some changes.",
      "This is a wake-up call. Your health deserves better.",
      "Danger zone! These products are not your friends.",
      "A recipe for trouble. Let's swap these out for healthier options."
    ],
    '20-40': [
      "Your products are leaning towards the unhealthy side. Small changes can make a big difference.",
      "A few too many unhealthy picks. Let's balance things out.",
      "Not the worst, but far from the best. Time to level up your choices.",
      "Your health could use a boost. Consider some healthier alternatives.",
      "A bit of a mixed bag, but trending unhealthy. Let's shift the balance."
    ],
    '40-60': [
      "You're on the fence. Some good choices, but room for improvement.",
      "A balanced mix, but you can tip the scales towards healthier.",
      "Not bad, but not great. Your health is steady, but let's aim higher.",
      "You're in the middle ground. A few tweaks can make a big difference.",
      "A solid start, but there's potential for a healthier lineup."
    ],
    '60-80': [
      "Your products are looking good! Keep up the healthy choices.",
      "A commendable effort. Your health is in good hands.",
      "You're on the right track. These products are doing your body good.",
      "A strong lineup of healthy picks. You're making smart choices.",
      "Your health is thriving. Keep these products in your rotation."
    ],
    '80-100': [
      "A gold standard for health! Your products are top-notch.",
      "You're a health superstar. These choices are exceptional.",
      "Your products are a beacon of wellness. Keep shining!",
      "A flawless selection. Your health is in expert hands.",
      "Perfection on a plate. These products are a gift to your body."
    ]
  };

  // Determine the score range
  let range: string;
  if (score >= 0 && score < 20) {
    range = '0-20';
  } else if (score >= 20 && score < 40) {
    range = '20-40';
  } else if (score >= 40 && score < 60) {
    range = '40-60';
  } else if (score >= 60 && score < 80) {
    range = '60-80';
  } else if (score >= 80 && score <= 100) {
    range = '80-100';
  } else {
    return "Invalid score. Please provide a score between 0 and 100.";
  }

  // Select a random phrase from the determined range
  const phraseArray = phrases[range];
  const randomIndex = Math.floor(Math.random() * phraseArray.length);
  return phraseArray[randomIndex];
}

const RatingBar = ({ ratings }: RatingBarProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getColor = (key: string) => {
    switch (key) {
      case 'a': return colors.ratings.a; // Dark teal
      case 'b': return colors.ratings.b; // Bright green
      case 'c': return colors.ratings.c; // Light yellow
      case 'd': return colors.ratings.d; // Orange-red
      case 'e': return colors.ratings.e; // Dark red
      default: return '#000';     // Black
    }
  };

  // Fixed order of segments
  const segmentOrder = ['a', 'b', 'c', 'd', 'e'];

  // Create segments with counts and colors
  const segments = segmentOrder.map(key => ({
    value: ratings[key] || 0,
    color: getColor(key),
  }));

  // Weights for scoring
  const weights = { 'a': 5, 'b': 4, 'c': 3, 'd': 2, 'e': 1 };

  // Calculate score
  let weighted_sum = 0;
  let total_count = 0;
  for (const key of segmentOrder) {
    const count = ratings[key] || 0;
    weighted_sum += count * weights[key as keyof typeof weights];
    total_count += count;
  }
  let score = 0;
  if (total_count > 0) {
    const average_rating = weighted_sum / total_count;
    score = ((average_rating - 1) / 4) * 100;
  }

  const phrase = getRandomPhrase(score);

  // Styles
  const styles = StyleSheet.create({
    container: {
      padding: 4,
      backgroundColor: colors.background,
      borderRadius: 20,
      overflow: 'hidden',
    },
    barContainer: {
      flexDirection: 'row',
      height: 30,
      overflow: 'hidden',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderColor: colors.background,
    },
    segment: {
      height: '100%',
    },
    scoreContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: colors.background,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    scoreText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: Fonts.sansSerif,
    },
    scoreTextTitle: {
      fontSize: 12,
      color: colors.text,
      fontFamily: Fonts.sansSerif,
      textAlign: 'center',
    },
    phraseText: {
      fontSize: 14,
      color: colors.text,
      fontFamily: Fonts.sansSerif,
      paddingHorizontal: 16,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {segments.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              {
                flex: segment.value,
                backgroundColor: segment.color,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.scoreContainer}>
        <View>
          <Text style={styles.scoreTextTitle}>Score</Text>
          <Text style={styles.scoreText}>{Math.round(score)} / 100</Text>
        </View>
        <Text style={styles.phraseText}>{phrase}</Text>
      </View>
    </View>
  );
};

export default RatingBar;
