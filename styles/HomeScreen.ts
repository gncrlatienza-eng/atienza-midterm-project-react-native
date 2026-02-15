import { StyleSheet, Platform } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createHomeStyles = (colors: ThemeColors, width: number, height: number) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    // HEADER
    header: {
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.01,
      paddingBottom: height * 0.015,
      backgroundColor: colors.background,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: width * 0.08,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.5,
    },
    
    // CONTENT CONTAINER
    contentContainer: {
      flex: 1,
    },
    
    // SCROLL VIEW
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: width * 0.05,
      paddingBottom: 100, // Space for search bar
    },
    
    // FEATURED SECTION
    featuredSection: {
      paddingTop: 20,
      paddingBottom: 12,
    },
    sectionTitle: {
      fontSize: width * 0.055,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    
    // JOBS SECTION
    jobsSection: {
      paddingTop: 12,
    },
    
    // SEARCH BAR CONTAINER - Transparent overlay at bottom
    searchBarContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 0,
      paddingVertical: 8,
      paddingBottom: Platform.select({ ios: 20, android: 12 }),
      backgroundColor: 'transparent', // Transparent!
      zIndex: 1000,
    },
    
    // SEARCH OVERLAY - Full screen when searching
    searchOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.background,
      zIndex: 999,
    },
    searchHeader: {
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.01,
      paddingBottom: height * 0.01,
    },
    searchTitle: {
      fontSize: width * 0.08,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.5,
    },
    
    // JOB CARD STYLES
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
      alignItems: 'center',
      marginBottom: 12,
    },
    companyLogo: {
      width: 52,
      height: 52,
      borderRadius: 12,
      marginRight: 12,
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    logoPlaceholder: {
      width: 52,
      height: 52,
      borderRadius: 12,
      marginRight: 12,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '25',
    },
    logoPlaceholderText: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.primary,
    },
    jobInfo: {
      flex: 1,
      marginRight: 0,
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
      marginBottom: 0,
    },
    jobDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
      marginTop: 12,
    },
    detailBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      gap: 6,
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
    savedButtonText: {
      color: '#FFFFFF',
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });