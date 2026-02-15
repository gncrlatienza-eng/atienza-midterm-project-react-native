import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createSearchBarStyles = (colors: ThemeColors, width: number) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    container: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 30, // Pill-shaped like iOS
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 48,
      borderWidth: 0, // No border for iOS style
    },
    focused: {
      backgroundColor: colors.backgroundSecondary, // Keep same background when focused
    },
    icon: {
      fontSize: 18,
      marginRight: 8,
      opacity: 0.6,
    },
    input: {
      flex: 1,
      fontSize: width * 0.04,
      color: colors.text,
      fontWeight: '400',
    },
    clearButton: {
      padding: 4,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.textTertiary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearIcon: {
      fontSize: 12,
      color: colors.background,
      fontWeight: '700',
    },
    // NEW: Cancel button styles
    cancelContainer: {
      marginLeft: 12,
      justifyContent: 'center',
    },
    cancelText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });