import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createApplicationFormStyles = (colors: ThemeColors) =>
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
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    cancelButton: {
      width: 60,
    },
    cancelText: {
      fontSize: 17,
      color: colors.primary,
      fontWeight: '400',
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
    },
    jobInfo: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      backgroundColor: colors.backgroundSecondary,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      alignItems: 'center',
    },
    logoContainer: {
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    companyLogo: {
      width: 64,
      height: 64,
      borderRadius: 12,
    },
    companyLogoFallback: {
      width: 64,
      height: 64,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    companyLogoText: {
      fontSize: 24,
      fontWeight: '700',
    },
    jobTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
      textAlign: 'center',
    },
    jobCompany: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.textSecondary,
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
    },
    fieldContainer: {
      marginBottom: 24,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputError: {
      borderColor: colors.error,
      borderWidth: 1.5,
    },
    textArea: {
      height: 120,
      paddingTop: 14,
    },
    hintText: {
      fontSize: 12,
      color: colors.textTertiary,
      marginTop: 4,
      fontStyle: 'italic',
    },
    characterCount: {
      fontSize: 13,
      color: colors.textTertiary,
      marginTop: 6,
      textAlign: 'right',
    },
    errorText: {
      fontSize: 13,
      color: colors.error,
      marginTop: 6,
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      paddingBottom: 20,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      fontSize: 17,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });