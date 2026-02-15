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
      backgroundColor: colors.background,
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
      backgroundColor: colors.backgroundSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
    },
    themeToggleText: {
      fontSize: 20,
      opacity: 0.8,
    },
    searchContainer: {
      marginBottom: height * 0.01,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: width * 0.05,
      backgroundColor: colors.background,
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
      alignItems: 'center', // Changed from 'flex-start' to 'center' for logo alignment
      marginBottom: 12,
    },
    // NEW: Company logo image styles
    companyLogo: {
      width: 52,
      height: 52,
      borderRadius: 12,
      marginRight: 12,
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    // NEW: Logo placeholder when no image available
    logoPlaceholder: {
      width: 52,
      height: 52,
      borderRadius: 12,
      marginRight: 12,
      backgroundColor: colors.primary + '15', // 15% opacity of primary color
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '25', // 25% opacity for subtle border
    },
    // NEW: Text inside logo placeholder
    logoPlaceholderText: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.primary,
    },
    jobInfo: {
      flex: 1,
      marginRight: 0, // Removed marginRight since logo is now on the left
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
      marginBottom: 0, // Removed bottom margin since we moved details below
    },
    jobDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
      marginTop: 12, // Added top margin for spacing from header
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
      backgroundColor: colors.background,
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
      backgroundColor: colors.background,
    },
  });