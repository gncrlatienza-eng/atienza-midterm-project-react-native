import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createHomeStyles = (colors: ThemeColors, width: number, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.02,
      paddingBottom: height * 0.015,
      backgroundColor: colors.background,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: height * 0.02,
    },
    title: {
      fontSize: width * 0.08,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.5,
    },
    themeToggle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.cardElevated,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    themeToggleText: {
      fontSize: 22,
    },
    searchContainer: {
      marginBottom: height * 0.01,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: width * 0.05,
    },
    jobList: {
      paddingTop: height * 0.015,
      paddingBottom: height * 0.02,
    },
    jobCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: width * 0.04,
      marginBottom: height * 0.015,
      borderWidth: 1,
      borderColor: colors.borderLight,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    jobHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    jobInfo: {
      flex: 1,
      marginRight: 12,
    },
    jobTitle: {
      fontSize: width * 0.045,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    company: {
      fontSize: width * 0.038,
      color: colors.textSecondary,
      fontWeight: '600',
      marginBottom: 8,
    },
    jobDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
    },
    detailBadge: {
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
    },
    detailText: {
      fontSize: width * 0.032,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    saveButton: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    savedButton: {
      backgroundColor: colors.success,
    },
    applyButton: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: width * 0.038,
      fontWeight: '700',
      color: colors.text,
    },
    applyButtonText: {
      color: '#FFFFFF',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: height * 0.1,
    },
    emptyText: {
      fontSize: width * 0.045,
      color: colors.textTertiary,
      fontWeight: '600',
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });