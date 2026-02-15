import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import Svg, { Circle, Path } from 'react-native-svg';

// Minimalistic Sun Icon (Light Mode)
const SunIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
    <Path d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Minimalistic Moon Icon (Dark Mode)
const MoonIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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