import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createLoadingStyles } from '../styles/LoadingScreen';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createLoadingStyles(colors, width, height);

  // Animation values
  const translateX = useRef(new Animated.Value(-width * 0.15)).current;
  const translateY = useRef(new Animated.Value(-height * 0.08)).current;
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Magnifying glass animation
    const magnifyAnimation = Animated.loop(
      Animated.sequence([
        // Move right
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: width * 0.15,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -height * 0.05,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        // Move down-left
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -width * 0.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: height * 0.05,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        // Move back to start
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -width * 0.15,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -height * 0.08,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Loading dots animation
    const dotsAnimation = Animated.loop(
      Animated.stagger(200, [
        Animated.sequence([
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dot3Opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    magnifyAnimation.start();
    dotsAnimation.start();

    // Finish loading after 2.5 seconds
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2500);

    return () => {
      magnifyAnimation.stop();
      dotsAnimation.stop();
      clearTimeout(timer);
    };
  }, [onFinish, translateX, translateY, dot1Opacity, dot2Opacity, dot3Opacity, width, height]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Animated Magnifying Glass */}
        <View style={styles.magnifyingGlassContainer}>
          <Animated.View
            style={[
              styles.magnifyingGlass,
              {
                transform: [{ translateX }, { translateY }],
              },
            ]}
          >
            <View style={styles.magnifyingHandle} />
          </Animated.View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hire n Go</Text>
          <Text style={styles.subtitle}>Find your dream job</Text>
        </View>

        {/* Loading Dots */}
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
        </View>
      </View>
    </View>
  );
};