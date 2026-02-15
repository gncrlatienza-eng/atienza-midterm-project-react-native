import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createLoadingStyles } from '../styles/LoadingScreen';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createLoadingStyles(colors, width, height);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>💼</Text>
          <Text style={styles.subtitle}>Job Finder</Text>
        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Finding opportunities...</Text>
        </View>
      </View>
    </View>
  );
};