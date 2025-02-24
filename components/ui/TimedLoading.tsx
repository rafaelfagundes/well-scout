import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TimedLoading = ({ duration = 15000, color = '#4CAF50', trackColor = '#E0E0E0' }) => {
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
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: trackColor }]}>
      <Animated.View style={[styles.progressBar, { 
        width: widthInterpolation,
        backgroundColor: color
      }]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  }
});

TimedLoading.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string,
  trackColor: PropTypes.string
};

export default TimedLoading;
