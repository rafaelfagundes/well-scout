import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { capitalize } from "@/lib/text";
import { Info } from "phosphor-react-native";
import { useColorScheme, View, Pressable, StyleSheet, Text } from "react-native";

export function NutrientBadge({ evaluation, information, toggleInformation }: { evaluation?: string, information?: string, toggleInformation?: () => void }) {
  if (!evaluation && !information) {
    return null;
  }
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getBackgroundColor = () => {
    if (evaluation === 'good') {
      return colors.ratings.a;
    }
    else if (evaluation === 'average') {
      return colors.ratings.c;
    }
    else if (evaluation === 'bad') {
      return colors.ratings.e;
    }
  }

  const styles = StyleSheet.create({
    badge: {
      flexDirection: 'row',
      color: colors.vegetarian,
      alignItems: 'center',
      backgroundColor: getBackgroundColor(),
      paddingRight: 3,
      paddingLeft: 8,
      paddingVertical: 2,
      borderRadius: 20,
      gap: 2,
    },
    text: {
      fontFamily: Fonts.sansSerif,
      fontSize: 12,
      color: colors.invertedText,
    }
  });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{capitalize(evaluation!)}</Text>
      <Pressable onPress={toggleInformation}>
        <Info size={16} color={colors.invertedText} />
      </Pressable>
    </View>
  );
}

