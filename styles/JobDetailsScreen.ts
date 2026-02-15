import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createJobDetailsStyles = (colors: ThemeColors, width: number, height: number) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    // HEADER - iOS 18 style
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.05,
      paddingVertical: 12,
      backgroundColor: colors.background,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.backgroundSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    
    // SCROLL VIEW
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    
    // HERO SECTION - App Store inspired
    heroSection: {
      paddingHorizontal: width * 0.05,
      paddingTop: 20,
      paddingBottom: 24,
      alignItems: 'center',
    },
    
    // COMPANY LOGO - Large, centered
    logoContainer: {
      marginBottom: 20,
    },
    companyLogo: {
      width: 100,
      height: 100,
      borderRadius: 22,
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    logoPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 22,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '25',
    },
    logoPlaceholderText: {
      fontSize: 40,
      fontWeight: '700',
      color: colors.primary,
    },
    
    // JOB TITLE & COMPANY
    jobTitle: {
      fontSize: width * 0.065,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
      paddingHorizontal: width * 0.05,
      letterSpacing: -0.5,
    },
    company: {
      fontSize: width * 0.042,
      fontWeight: '600',
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
    },
    
    // QUICK INFO TAGS
    quickInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 24,
    },
    infoTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      gap: 6,
    },
    infoTagText: {
      fontSize: width * 0.032,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    
    // ACTION BUTTONS ROW
    actionRow: {
      flexDirection: 'row',
      width: '100%',
      gap: 12,
    },
    applyButton: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    applyButtonText: {
      fontSize: width * 0.042,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: 0.3,
    },
    saveButton: {
      width: 56,
      height: 56,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.primary + '30',
    },
    saveButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    
    // DIVIDER
    divider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginVertical: 8,
      marginHorizontal: width * 0.05,
    },
    
    // CONTENT SECTIONS
    section: {
      paddingHorizontal: width * 0.05,
      marginTop: 28,
    },
    sectionTitle: {
      fontSize: width * 0.052,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    
    // DESCRIPTION TEXT
    descriptionText: {
      fontSize: width * 0.04,
      lineHeight: width * 0.064,
      color: colors.textSecondary,
      fontWeight: '400',
    },
    
    // LIST CONTAINER
    listContainer: {
      gap: 12,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    bulletDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.primary,
      marginTop: 8,
      opacity: 0.8,
    },
    listText: {
      flex: 1,
      fontSize: width * 0.04,
      lineHeight: width * 0.062,
      color: colors.textSecondary,
      fontWeight: '400',
    },
  });