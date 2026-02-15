import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createLoadingStyles = (colors: ThemeColors, width: number, height: number) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      marginBottom: height * 0.05,
    },
    logo: {
      fontSize: width * 0.15,
      fontWeight: '700',
      color: colors.primary,
      letterSpacing: -1,
    },
    subtitle: {
      fontSize: width * 0.045,
      color: colors.textSecondary,
      fontWeight: '600',
      marginTop: 8,
    },
    loadingContainer: {
      marginTop: height * 0.08,
    },
    loadingText: {
      marginTop: 20,
      fontSize: width * 0.038,
      color: colors.textTertiary,
      fontWeight: '500',
    },
  });