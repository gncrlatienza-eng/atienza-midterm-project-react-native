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
      ? 'rgba(28, 28, 30, 0.94)'
      : 'rgba(255, 255, 255, 0.94)',
    borderTopWidth: 0.5,
    borderTopColor: isDarkMode 
      ? 'rgba(84, 84, 88, 0.3)' 
      : 'rgba(0, 0, 0, 0.1)',
    height: 80,
    marginHorizontal: 24,
    marginBottom: 18,
    borderRadius: 26,
    paddingTop: 6,
    paddingBottom: 20,
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
    marginTop: 2,
  },
  tabBarIconStyle: {
    marginTop: 4,
  },
});