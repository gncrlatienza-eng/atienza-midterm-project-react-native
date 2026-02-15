// Theme type definitions
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Background colors
  background: string;
  backgroundSecondary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Card/Surface colors
  card: string;
  cardElevated: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Accent/Primary colors
  primary: string;
  primaryLight: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  
  // Tab bar
  tabBarBackground: string;
  tabBarInactive: string;
  tabBarActive: string;
  
  // Shadow
  shadow: string;
}

export interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}