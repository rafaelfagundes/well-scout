import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface TimedLoadingProps {
  duration?: number;
  color?: string;
  trackColor?: string;
}

const TimedLoading = ({ duration = 15000, color = '#4CAF50', trackColor = '#E0E0E0' }: TimedLoadingProps) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, []);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['5%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: trackColor }]}>
      <Animated.View style={[styles.progressBar, {
        width: widthInterpolation,
        backgroundColor: color
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
    padding: 4

  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  }
});

export default TimedLoading;
