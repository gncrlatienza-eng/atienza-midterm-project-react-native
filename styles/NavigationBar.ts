import { ThemeColors } from '../types/Theme';

interface TabBarStyleParams {
  colors: ThemeColors;
  isDarkMode: boolean;
}

export const createTabBarStyles = ({ colors, isDarkMode }: TabBarStyleParams) => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textTertiary,
  tabBarStyle: {
    position: 'absolute' as const,
    backgroundColor: isDarkMode 
      ? 'rgba(28, 28, 30, 0.90)' // Dark mode: slightly transparent
      : 'rgba(255, 255, 255, 0.90)', // Light mode: slightly transparent
    borderTopWidth: 0.5,
    borderTopColor: isDarkMode 
      ? 'rgba(84, 84, 88, 0.3)' 
      : 'rgba(0, 0, 0, 0.1)',
    height: 90,
    paddingTop: 8,
    paddingBottom: 28,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 8,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '500' as const,
    marginTop: 4,
  },
  tabBarIconStyle: {
    marginTop: 4,
  },
});