import { Dimensions, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fonts } from "@/constants/Fonts";
import { Colors } from '@/constants/Colors';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { removeHTMLTags } from '@/lib/text';
import { NutrientBadge } from "./NutrientBadge";

function NutrientItem({ nutrient, isLast = false }: { nutrient: any; isLast?: boolean }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [isExpanded, setIsExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  // Animate height when isExpanded or fullHeight changes
  useEffect(() => {
    animatedHeight.value = withTiming(isExpanded ? fullHeight : 0, { duration: 300 });
  }, [isExpanded, fullHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      overflow: 'hidden',
    };
  });

  const styles = StyleSheet.create({
    nutrimentItem: {
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: colors.text + '10',
      paddingVertical: 8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
    },
    nutrimentColumn: {
      flexDirection: 'column',
      gap: 8,
    },
    nutrimentLabel: {
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      textTransform: 'capitalize',
      fontFamily: Fonts.sansSerif,
    },
    nutrimentValue: {
      color: Colors[colorScheme ?? 'light'].text,
      fontFamily: Fonts.sansSerif,
    },
    information: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.75,
      marginTop: 4,
      lineHeight: 16,
    },
    offscreen: {
      position: 'absolute',
      top: -9999,
      left: 0,
      width: Dimensions.get('window').width - 16, // Match container width minus padding
      opacity: 0,
    }
  });

  const handleLayout = (event: any) => {
    const height = event.nativeEvent.layout.height;
    if (height > 0 && height !== fullHeight) {
      setFullHeight(height);
      animatedHeight.value = isExpanded ? height : 0; // Set initial height
    }
  };

  const informationText = removeHTMLTags(nutrient.information);

  return (
    <View style={styles.nutrimentItem}>
      <View style={styles.row}>
        <View style={styles.nutrimentColumn}>
          <Text style={styles.nutrimentLabel}>{nutrient.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.nutrimentValue}>
            {(() => {
              // Split value into number and unit parts
              const matches = `${nutrient.value}`.match(/^(\d+\.?\d*)(.*)/);
              if (matches) {
                const [_, numberPart, unitPart] = matches;
                const formattedNumber = Number.parseFloat(numberPart).toFixed(2);
                const trimmedUnit = unitPart.trim();
                return trimmedUnit 
                  ? `${formattedNumber} ${trimmedUnit}` 
                  : formattedNumber;
              }
              return nutrient.value; // Fallback for non-numeric values
            })()}
          </Text>
          {nutrient.evaluation && <NutrientBadge evaluation={nutrient.evaluation} information={nutrient.information} toggleInformation={() => setIsExpanded(!isExpanded)} />}
        </View>
      </View>
      {nutrient.information && (
        <>
          {/* Offscreen measurement */}
          <View style={styles.offscreen} onLayout={handleLayout}>
            <Text style={[styles.nutrimentValue, styles.information]}>{informationText}</Text>
          </View>

          {/* Animated content */}
          <Animated.View style={animatedStyle}>
            <Text style={[styles.nutrimentValue, styles.information]}>{informationText}</Text>
          </Animated.View>
        </>
      )}
    </View>
  );
}
export default NutrientItem
