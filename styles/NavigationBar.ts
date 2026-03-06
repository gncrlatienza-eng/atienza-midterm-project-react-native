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
      ? 'rgba(28, 28, 30, 0.9)'
      : 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 0.5,
    borderTopColor: isDarkMode
      ? 'rgba(84, 84, 88, 0.35)'
      : 'rgba(0, 0, 0, 0.12)',
    height: 78,
    marginHorizontal: 24,
    marginBottom: 28,
    borderRadius: 26,
    paddingTop: 6,
    paddingBottom: 14,
    overflow: 'hidden' as const,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: isDarkMode ? 0.22 : 0.1,
    shadowRadius: 18,
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