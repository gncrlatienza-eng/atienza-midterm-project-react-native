import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

interface FeaturedJobCardStyleParams {
  colors: ThemeColors;
  isDarkMode: boolean;
}

export const createFeaturedJobCardStyles = ({ colors, isDarkMode }: FeaturedJobCardStyleParams) =>
  StyleSheet.create({
    card: {
      // Distinctive background color for featured cards
      backgroundColor: isDarkMode 
        ? 'rgba(0, 122, 255, 0.1)' // Blue tint in dark mode
        : 'rgba(0, 122, 255, 0.05)', // Subtle blue tint in light mode
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      marginHorizontal: 20,
      borderWidth: 1.5,
      borderColor: colors.primary, // Blue border to highlight featured status
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    featuredBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      zIndex: 1,
    },
    featuredText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    logoContainer: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.card,
      marginBottom: 12,
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
      fontSize: 24,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    company: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    detail: {
      fontSize: 13,
      color: colors.textTertiary,
      fontWeight: '400',
    },
    separator: {
      marginHorizontal: 6,
      fontSize: 13,
      color: colors.textTertiary,
    },
    viewButton: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 20,
      alignSelf: 'flex-end',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    viewButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '600',
    },
  });