import { Dimensions, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fonts } from '@/constants/Fonts';
import { removeHTMLTags } from '@/lib/text';
import { Info } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

function AdditiveItem({ additive, isLast = false }: { additive: any; isLast?: boolean }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

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
    additiveItem: {
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: colors.text + '10',
      paddingVertical: 8,
    },
    text: {
      color: colors.text,
      textTransform: 'capitalize',
      fontFamily: Fonts.sansSerif,
    },
    information: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.75,
      marginTop: 4,
      lineHeight: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    offscreen: {
      position: 'absolute',
      top: -9999,
      left: 0,
      width: Dimensions.get('window').width - 16, // Match container width minus padding
      opacity: 0,
    },
  });

  const handleLayout = (event: any) => {
    const height = event.nativeEvent.layout.height;
    if (height > 0 && height !== fullHeight) {
      setFullHeight(height);
      animatedHeight.value = isExpanded ? height : 0; // Set initial height
    }
  };

  const informationText = removeHTMLTags(additive.information);

  return (
    <View style={styles.additiveItem}>
      <View style={styles.row}>
        <Text style={styles.text}>{additive.name}</Text>
        {additive.information ? (
          <Pressable onPress={() => setIsExpanded(!isExpanded)}>
            <Info size={22} color={colors.vegetarian} />
          </Pressable>
        ) : null}
      </View>
      {additive.information && (
        <>
          {/* Offscreen measurement */}
          <View style={styles.offscreen} onLayout={handleLayout}>
            <Text style={[styles.text, styles.information]}>
              {informationText}
            </Text>
          </View>

          {/* Animated content */}
          <Animated.View style={animatedStyle}>
            <Text style={[styles.text, styles.information]}>
              {informationText}
            </Text>
          </Animated.View>
        </>
      )}
    </View>
  );
}
export default AdditiveItem

