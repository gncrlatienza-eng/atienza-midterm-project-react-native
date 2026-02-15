import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createSearchBarStyles = (colors: ThemeColors, width: number) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    container: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 25, // Pill-shaped
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      height: 44,
      borderWidth: 0,
      flex: 1,
    },
    focused: {
      backgroundColor: colors.backgroundSecondary,
    },
    input: {
      flex: 1,
      fontSize: 17,
      color: colors.text,
      fontWeight: '400',
      marginLeft: 8,
    },
    clearButton: {
      padding: 2,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.textTertiary,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 6,
    },
    cancelContainer: {
      marginLeft: 8,
      paddingHorizontal: 4,
    },
    cancelText: {
      fontSize: 17,
      fontWeight: '400',
    },
  });