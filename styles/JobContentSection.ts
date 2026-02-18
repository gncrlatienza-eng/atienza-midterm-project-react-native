import { StyleSheet } from 'react-native';
import { ThemeColors } from '../types/Theme';

export const createJobContentSectionStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    section: {
      marginBottom: 32,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
      letterSpacing: 0.35,
    },
    contentCard: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 16,
      padding: 18,
      marginBottom: 8,
    },
    descriptionText: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      fontWeight: '400',
    },
    listContainer: {
      gap: 14,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    iconContainer: {
      marginTop: 1,
    },
    listText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      fontWeight: '400',
    },
  });