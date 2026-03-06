import { ThemeColors } from '../types/Theme';

interface TabBarStyleParams {
  colors: ThemeColors;
  isDarkMode: boolean;
}

export const createTabBarStyles = ({ colors, isDarkMode }: TabBarStyleParams) => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textTertiary,
  tabBarStyle: {
    backgroundColor: isDarkMode
      ? 'rgba(28, 28, 30, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 0.5,
    borderTopColor: isDarkMode
      ? 'rgba(84, 84, 88, 0.4)'
      : 'rgba(0, 0, 0, 0.12)',
    height: 60,
    paddingTop: 4,
    paddingBottom: 8,
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