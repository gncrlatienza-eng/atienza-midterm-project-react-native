import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createSavedJobsStyles = (colors: ThemeColors, width: number, height: number) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: height * 0.01,
      paddingBottom: height * 0.015,
      backgroundColor: colors.background,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 34,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: 0.37,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.textSecondary,
      marginTop: 4,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 16,
      paddingBottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyText: {
      fontSize: 17,
      color: colors.textTertiary,
      fontWeight: '500',
      textAlign: 'center',
      lineHeight: 24,
    },
  });