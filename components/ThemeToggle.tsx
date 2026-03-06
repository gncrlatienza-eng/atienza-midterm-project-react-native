import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import Svg, { Circle, Path } from 'react-native-svg';

// Simplified Sun Icon (Light Mode) – outlined circle
const SunIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="6.5" stroke={color} strokeWidth="1.8" />
  </Svg>
);

// Simplified Moon Icon (Dark Mode) – shaded circle
const MoonIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="6.5" fill={color} />
  </Svg>
);

export const ThemeToggle: React.FC = () => {
  const { colors, toggleTheme, isDark } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createHomeStyles(colors, width, height);

  return (
    <TouchableOpacity
      style={styles.themeToggle}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      {isDark ? (
        <SunIcon color={colors.text} />
      ) : (
        <MoonIcon color={colors.text} />
      )}
    </TouchableOpacity>
  );
};