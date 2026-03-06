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
      d="M21 12.79C20.24 13.12 19.43 13.3 18.6 13.3C14.25 13.3 10.75 9.8 10.75 5.45C10.75 4.62 10.93 3.81 11.26 3.04C8.32 3.89 6.25 6.55 6.25 9.65C6.25 14 9.75 17.5 14.1 17.5C17.2 17.5 19.86 15.43 20.71 12.49Z"
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