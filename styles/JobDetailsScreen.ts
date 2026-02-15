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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.05,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: width * 0.045,
      fontWeight: '600',
      color: colors.text,
    },
    placeholder: {
      width: 40,
    },
    content: {
      flex: 1,
      paddingHorizontal: width * 0.05,
    },
    titleSection: {
      paddingTop: 24,
      paddingBottom: 16,
    },
    jobTitle: {
      fontSize: width * 0.065,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    company: {
      fontSize: width * 0.045,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    badgesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 24,
    },
    badge: {
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    badgeText: {
      fontSize: width * 0.035,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: width * 0.05,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    },
    sectionText: {
      fontSize: width * 0.04,
      color: colors.textSecondary,
      lineHeight: width * 0.06,
    },
    bulletPoint: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    bullet: {
      fontSize: width * 0.04,
      color: colors.primary,
      marginRight: 8,
      marginTop: 2,
    },
    footer: {
      paddingHorizontal: width * 0.05,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      backgroundColor: colors.background,
    },
    applyButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyButtonText: {
      fontSize: width * 0.042,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });