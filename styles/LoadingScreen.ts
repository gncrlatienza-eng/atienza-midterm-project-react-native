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
      width: width * 0.8,
    },
    // Magnifying glass container
    magnifyingGlassContainer: {
      width: width * 0.5,
      height: width * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: height * 0.05,
    },
    magnifyingGlass: {
      width: width * 0.25,
      height: width * 0.25,
      borderRadius: (width * 0.25) / 2,
      borderWidth: 4,
      borderColor: colors.text,
      position: 'absolute',
    },
    magnifyingHandle: {
      width: 4,
      height: width * 0.12,
      backgroundColor: colors.text,
      position: 'absolute',
      bottom: -width * 0.08,
      right: -width * 0.02,
      transform: [{ rotate: '45deg' }],
      borderRadius: 2,
    },
    titleContainer: {
      marginBottom: height * 0.08,
    },
    title: {
      fontSize: width * 0.12,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -1,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: width * 0.04,
      color: colors.textSecondary,
      fontWeight: '500',
      marginTop: 8,
      textAlign: 'center',
    },
    loadingDots: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 20,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.textTertiary,
    },
  });