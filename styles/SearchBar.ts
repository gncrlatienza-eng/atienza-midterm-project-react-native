import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createSearchBarStyles = (colors: ThemeColors, width: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      height: 44,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    focused: {
      borderColor: colors.primary,
      backgroundColor: colors.card,
    },
    icon: {
      fontSize: 18,
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: width * 0.04,
      color: colors.text,
      fontWeight: '500',
    },
    clearButton: {
      padding: 4,
    },
    clearIcon: {
      fontSize: 16,
      color: colors.textTertiary,
    },
  });