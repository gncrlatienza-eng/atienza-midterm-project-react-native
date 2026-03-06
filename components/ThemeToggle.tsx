import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import Svg, { Circle, Path } from 'react-native-svg';

// Simplified Sun Icon (Light Mode)
const SunIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.8" />
  </Svg>
);

// Simplified Moon Icon (Dark Mode)
const MoonIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 13.5C17.5 13.7 16.96 13.8 16.4 13.8C13.97 13.8 12 11.83 12 9.4C12 8.04 12.52 6.81 13.4 5.9C11.4 6.3 10 7.9 10 9.9C10 12.6 12.2 14.8 14.9 14.8C16.15 14.8 17.28 14.3 18 13.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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