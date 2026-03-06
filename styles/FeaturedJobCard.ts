import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

interface FeaturedJobCardStyleParams {
  colors: ThemeColors;
  isDarkMode: boolean;
}

export const createFeaturedJobCardStyles = ({ colors, isDarkMode }: FeaturedJobCardStyleParams) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? colors.card : '#FFFFFF',
      borderRadius: 20,
      marginBottom: 16,
      marginHorizontal: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDarkMode ? 0.35 : 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
    featuredBadge: {
      position: 'absolute',
      top: 14,
      right: 14,
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      zIndex: 1,
    },
    featuredText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.6,
    },
    heroImageContainer: {
      width: '100%',
      height: 140,
      backgroundColor: isDarkMode ? colors.backgroundSecondary : colors.borderLight + '40',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 18,
      backgroundColor: isDarkMode ? colors.background : '#FFFFFF',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    logoFallback: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgroundSecondary,
    },
    logoText: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    contentBlock: {
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 6,
      letterSpacing: -0.3,
    },
    company: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    description: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.textTertiary,
      marginBottom: 16,
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 16,
    },
    detail: {
      fontSize: 14,
      color: colors.textTertiary,
      fontWeight: '500',
    },
    separator: {
      marginHorizontal: 6,
      fontSize: 14,
      color: colors.textTertiary,
    },
    viewButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 14,
      alignSelf: 'flex-start',
    },
    viewButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });