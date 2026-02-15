import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeColors, ThemeContextType } from '../types/Theme';

// iOS 18 Light Theme Colors
const lightColors: ThemeColors = {
  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  
  // Text
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  
  // Cards
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  
  // Borders
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  
  // Primary/Accent
  primary: '#007AFF',
  primaryLight: '#5AC8FA',
  
  // Status
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // Tab Bar
  tabBarBackground: '#F2F2F7',
  tabBarInactive: '#8E8E93',
  tabBarActive: '#007AFF',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// iOS 18 Dark Theme Colors
const darkColors: ThemeColors = {
  // Backgrounds
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  
  // Text
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#8E8E93',
  
  // Cards
  card: '#1C1C1E',
  cardElevated: '#2C2C2E',
  
  // Borders
  border: '#38383A',
  borderLight: '#48484A',
  
  // Primary/Accent
  primary: '#0A84FF',
  primaryLight: '#64D2FF',
  
  // Status
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  
  // Tab Bar
  tabBarBackground: '#1C1C1E',
  tabBarInactive: '#8E8E93',
  tabBarActive: '#0A84FF',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Load saved theme preference on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;
  const isDark = theme === 'dark';

  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
    isDark,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};