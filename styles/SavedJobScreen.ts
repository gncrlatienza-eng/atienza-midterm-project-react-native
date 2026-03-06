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
      paddingTop: 20,
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
    appliedToggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 10,
    },
    appliedBadge: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    appliedBadgeText: {
      fontSize: width * 0.034,
      fontWeight: '600',
      color: colors.textSecondary,
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