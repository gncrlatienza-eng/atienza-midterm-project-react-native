import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createJobContentSectionStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    section: {
      marginBottom: 28,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 14,
      letterSpacing: -0.4,
      lineHeight: 30,
    },
    contentCard: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 16,
      padding: 20,
      marginBottom: 0,
      borderWidth: 0.5,
      borderColor: colors.borderLight,
    },
    contentLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 10,
      letterSpacing: 0.2,
    },
    descriptionText: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.textSecondary,
      fontWeight: '400',
    },
    contentBullets: {
      gap: 10,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
    },
    bulletDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.textSecondary,
      marginTop: 9,
      opacity: 0.7,
    },
    bulletText: {
      flex: 1,
      fontSize: 16,
      lineHeight: 24,
      color: colors.textSecondary,
      fontWeight: '400',
    },
    listCard: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 16,
      padding: 20,
      marginTop: 0,
      borderWidth: 0.5,
      borderColor: colors.borderLight,
    },
    listContainer: {
      gap: 16,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
    },
    iconContainer: {
      marginTop: 2,
    },
    listText: {
      flex: 1,
      fontSize: 16,
      lineHeight: 24,
      color: colors.textSecondary,
      fontWeight: '400',
    },
  });