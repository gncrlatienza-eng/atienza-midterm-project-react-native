import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '../context/ThemedContext';

export const ThemedStatusBar = () => {
  const { isDark, colors } = useTheme();
  
  return (
    <StatusBar 
      barStyle={isDark ? 'light-content' : 'dark-content'}
      backgroundColor={colors.background}
      translucent={false}
    />
  );
};