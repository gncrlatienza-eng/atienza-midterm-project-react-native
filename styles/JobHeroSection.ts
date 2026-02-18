import { StyleSheet } from 'react-native';

export const createJobHeroStyles = () =>
  StyleSheet.create({
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    applyButtonInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    cancelText: {
      color: '#EF4444',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 10,
      textDecorationLine: 'underline',
    },
  });