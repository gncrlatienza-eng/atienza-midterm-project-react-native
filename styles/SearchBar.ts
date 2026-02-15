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
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      height: 36,
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
      marginLeft: 6,
    },
    clearButton: {
      padding: 2,
      width: 18,
      height: 18,
      borderRadius: 9,
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