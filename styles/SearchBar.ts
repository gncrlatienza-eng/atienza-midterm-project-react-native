import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createSearchBarStyles = (colors: ThemeColors, width: number) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // Center everything
      paddingHorizontal: 20,
    },
    container: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 48,
      borderWidth: 0,
    },
    focused: {
      backgroundColor: colors.backgroundSecondary,
    },
    input: {
      flex: 1,
      fontSize: width * 0.04,
      color: colors.text,
      fontWeight: '400',
      marginLeft: 8,
    },
    clearButton: {
      padding: 4,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.textTertiary,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    cancelContainer: {
      marginLeft: 12,
      justifyContent: 'center',
    },
    cancelText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });