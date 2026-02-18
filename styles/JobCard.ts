import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createJobCardStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    header: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    logoContainer: {
      width: 48,
      height: 48,
      borderRadius: 10,
      backgroundColor: colors.backgroundSecondary,
      marginRight: 12,
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
      fontSize: 20,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    headerContent: {
      flex: 1,
      justifyContent: 'center',
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
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    detailText: {
      fontSize: 13,
      color: colors.textTertiary,
      fontWeight: '400',
    },
    // Actions container - always same layout
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    // Both buttons always have flex: 1 (equal width)
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
    },
    // Default styles
    saveButton: {
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    savedButton: {
      backgroundColor: '#34C759',
      borderColor: '#34C759',
      borderWidth: 1,
    },
    removeButton: {
      backgroundColor: '#FF3B30',
      borderColor: '#FF3B30',
      borderWidth: 1,
    },
    applyButton: {
      backgroundColor: colors.primary,
    },
    appliedButton: {
      backgroundColor: '#34C759',
      borderColor: '#34C759',
      borderWidth: 1,
    },
    cancelButton: {
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    // Text styles
    buttonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    whiteButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });